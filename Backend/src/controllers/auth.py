from datetime import datetime, timedelta
# from mysql.connector.errors import DatabaseError

from hashlib import sha256
from flask import request, abort, Response
import jwt
import json

JWT_KEY = 'Shhh'
COOKIE_KEY = 'auth'
# HACK implement environs vars with .env file  

def validate(func) :#{
    def wrap(*args, **kwargs) :#{
        try :#{
            res = func(*args, **kwargs)
            return res
        #}
        # except DatabaseError as err :#{
        #     print(err)
        #     print(type(err))
        #     return {'message' : 'There are probles whit Data Base, try later'}, 500 
        # #}
        except Exception as err:#{
            print(err)
            print(type(err))
            return {"message" : "Some went bad :("}, 500
        #}
    #}
    return wrap
#}

@validate
def whoami() :#{
    data, status = get_auth_user() # data, status = src.controllers.auth.get_auth_user()
    if status != 200 :#{
        return {'message' : data['message'] }, status
    #}
    
    return data, 200  # return {*dict(data)}, 200
#}

@validate
def login(email : str, password : str) :#{
    if (not email or not password) : return {'message' : "Insuficient data"}, 400
    password = sha256(password.encode()).hexdigest()

    import src.controllers.user #it avoid circular imports
    data, status = src.controllers.user.get_by_email(email, return_password = True, is_for_login = True)
    # print(data)
    # print(status)
    if status != 200 : return data, status

    print(f'{password=}')
    print(f'{data['password']=}')
    if(password != data['password']) : return {'message' : "incorrect user or password"}, 403

    del data['birthdate']
    # FIXME datetime's expiration has problems with time zone
    payload = {
        **data,
        'iat' : datetime.now(),
        'exp' : (datetime.now() + timedelta(days = 1)),
        # 'exp' : (datetime.now() + timedelta(minutes=30)),
        # 'iat' : datetime.now().timestamp(),
        # 'exp' : (datetime.now() + timedelta(minutes=30)).timestamp()
    }

    token = jwt.encode(payload, JWT_KEY, 'HS256')
    res = Response(json.dumps({ 'token' : token }), status = 200, content_type='application/json')
    res.set_cookie(COOKIE_KEY, token, httponly = True, secure = True, max_age = 3600)
    # res.set_cookie(COOKIE_KEY, token, httponly = True, max_age = 3600)
    print("0k2")
    print(res)
    return res # return { 'token' : token }
#}

@validate
def logout() :#{
    res = Response(json.dumps({'message' : "Logout successfull"}), status = 200, content_type='application/json')
    res.delete_cookie(COOKIE_KEY, httponly = True, secure=True) # res.set_cookie(COOKIE_KEY, '_', httponly = True, secure = True, max_age = 0, expires = 0)
    return res
#}

def auth_middleware() :#{
    # token_header : str = get_auth_header()
    # print(token_header)
    # if (not token_header) :#{
    #     abort(Response(b'{"message" : "Token not provided"}', status = 400, content_type='application/json')) # print(f"{token_header=}")
    # #}
    
    err_code = None # HACK : this way is wrong(delete err_code var), manage exceptions or other method.
    try :#{
        # token : str = get_token_from_header()
        # data, err = decode_token(token)

        data, status = get_auth_user()
        if status != 200 :#{
            err_code = status
            raise Exception((f"Error decoding token : {data['message']}"))
        #}
    #}
    except Exception as err :#{
        print(err)
        print(type(err))
        if("token" in err.args[0]) :#{
            # return abort(Response(json.dumps({'message' : f"{err}"}), status = 400, content_type = 'application/json'))
            return abort(Response(json.dumps({'message' : f"{err}"}), status = err_code or 400, content_type = 'application/json'))
        #}
        # abort(Response(json.dumps({'message' : f"Error validating authentication token : {err}"}), status = 400, content_type = 'application/json'))
        abort(Response(json.dumps({'message' : f"Error validating authentication token : {err}"}), status = err_code or 400, content_type = 'application/json'))
    #} 
#}


# ---------| Functions |--------
def get_auth_user() -> tuple[2] :#{
    token_by_header = get_token_from_header()
    token_by_cookie = get_token_from_cookie()
    if (not token_by_header and not token_by_cookie) :#{
        # return None, "Token not provided", 400
        # return {'message' : "Token not provided"}, 400
        return {'message' : "Token not provided"}, 401
    #}
    token = token_by_header or token_by_cookie
    decoded_token, err = decode_token(token)
    # return decoded_token, err, 500 if err else 200
    if err :#{
        print(err)
        return {'message' : err}, 500
    #}
    return decoded_token, 200
#}

def get_token_from_cookie() :#{
    token = request.cookies.get(COOKIE_KEY)
    return token
#}

def get_token_from_header() -> str | None :#{
    auth_header = get_auth_header()
    try :#{
        if auth_header and auth_header.startswith('Bearer '):#{
            token : str = auth_header.split(' ')[1]
            return token
        #}
        return None
    #}
    except :#{
        return None
    #}
#}

def decode_token(token : str) :#{
    if not token : return None, "Null Token"
    try :#{
        decoded = jwt.decode(token, JWT_KEY, algorithms=['HS256'])
        decoded = dict(decoded)
        return decoded, None
    #}
    except jwt.exceptions.PyJWTError as err :#{
        return None, str(err)
    #}
#}

def get_auth_header() -> str | None :#{
    auth_header : str = request.headers.get('Authorization')
    return auth_header
#}






""" 

# def extract_token(auth_header) -> str | None :#{
def extract_token() -> str | None :#{
    auth_header = get_auth_header()
    try :#{
        token : str = auth_header.split(' ')[1]
        return token
    #}
    except :#{
        return None
    #}
#}

def decode_token(token : str) :#{
    try :#{
        # if not token 
        decoded = jwt.decode(token, JWT_KEY, algorithms=['HS256'])
        return decoded, None
    #}
    except jwt.exceptions.PyJWTError as err :#{
        return None, str(err)
    #}
#}
 """
# BEARER_REGEX   = r'^Bearer\s+[A-Za-z0-9-_=]{20,}\.[A-Za-z0-9-_=]{20,}\.[A-Za-z0-9-_=]{20,}$'
# if not re.match(BEARER_REGEX, token_header, re.IGNORECASE) :#{ # pattern = re.compile(BEARER_JWT, re.IGNORECASE)
        # abort(Response(json.dumps({'message' : "Invalid Token"}), 400))
    # #}