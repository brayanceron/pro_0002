from werkzeug.datastructures.file_storage import FileStorage
from mysql.connector.errors import IntegrityError, DatabaseError

from src.utils.load_file import load_file
from src.db.database import DatabaseConnection # ,get_connection
from datetime import datetime
from hashlib import sha256
from uuid import uuid4
from src.utils.generate_backup import generate_json_backup, load_json_backup, read_backup_file
from src.controllers.auth_controllers.generic_auth_controller import auth_get, auth_get_id, auth_put, auth_delete, auth_get_by_user
import src.controllers.auth

db = DatabaseConnection()

# TODO -> active get user endpoint
# def get() :#{
#     return {'message' : "Not available"}, 200
# #}

def validate(func) :#{
    def wrap(*args, **kwargs) :#{
        try :#{
            return func(*args, **kwargs)
        #}
        except DatabaseError as err :#{
            print(err)
            print(type(err))
            return {'message' : 'There are probles whit Data Base, try later'}, 500 
        #}
        except Exception as err:#{
            print(err)
            print(type(err))
            return {"message" : "Some went bad :("}, 500
        #}
    #}
    return wrap
#}

@validate
def get_id(id, return_password : bool = False,) :#{ # INFO : review who use return_password, this for security, the pass must'n send to front/client
    if (AUTH_ERROR := auth_get_id(id)) : return AUTH_ERROR
    if not id : return {'message' : "user id not provided"}, 400

    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute("""select id, name, gender, description, email, birthdate, image, available, password
                    from user where id = %s""", [id]);

        row = cur.fetchone()
        if cur.rowcount == 0 : return {'message' : "user not found"}, 404

        user = {
            'id':row[0],
            'name':row[1],
            'gender':row[2],
            'description':row[3],
            'email':row[4],
            'birthdate':str(row[5]),
            'image':row[6],
            'available':row[7],
            'password':row[8],
        }

        if not return_password : del user['password']
        return user, 200
    #}
#}

@validate
def get_by_email(email : str, return_password : bool = False, is_for_login = False) :#{
    if not email : return {'message' : "email not provided"}, 400

    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute("""select id, name, gender, description, email, birthdate, image, available, password
                    from user where email = %s""", [email]);
        
        row = cur.fetchone()
        if cur.rowcount == 0 : return {'message' : "user not found"}, 404
        
        user = {
            'id':row[0],
            'name':row[1],
            'gender':row[2],
            'description':row[3],
            'email':row[4],
            'birthdate':str(row[5]),
            'image':row[6],
            'available':row[7],
            'password':row[8],
        }
        
        if (not is_for_login) :#{
            if (AUTH_ERROR := auth_get_id(user['id'])) : return AUTH_ERROR
        #}
        
        if not return_password : del user['password']
        return user, 200
    #}
#}

@validate
def post(name : str, gender : str, description : str, email : str, birthdate : str, password : str, password2 : str, 
        image_file : FileStorage, available = 1, req_auth : bool = True ,to_login = False) :#{

    if (not name or not gender or not email or not birthdate or not password or not password2):#{
        return {'message' : "Insuficient data"}, 400
    #}

    #TODO: verify if already exist user with that same email

    id : str = uuid4().hex
    if(req_auth) :#{
        if (AUTH_ERROR := auth_get_id(id)) : return AUTH_ERROR; # INFO this always is false if there isn't session
    #}
    image = load_file(image_file, sub_folders = [id], prefix = 'user_image') or ''
    if(password != password2) : return {'message' : "Passwords are diferents"}, 400

    password = sha256(password.encode()).hexdigest()
    birthdate = format_date(birthdate)
    if (not birthdate): return {'message' : "Invalid birthdate" }, 400

    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute("""insert into user(id, name, gender, description, email, birthdate, image, available, password)
                    values (%s, %s, %s, %s, %s, %s, %s, %s, %s)""", [id, name, gender, description, email, birthdate, image, available, password])
        conn.commit()
    
        if to_login : return src.controllers.auth.login(email, password2)
        return {'message' : "user registered", 'id' : id }, 200
    #}
#}

@validate
def put(id : str, name : str, gender : str, description : str, email : str, birthdate : str, password : str, password2 : str, image_file : FileStorage, available = 1,) :#{
    if not id : return {'message' : "user id not provided"}, 400;
    if (AUTH_ERROR := auth_get_id(id)) : return AUTH_ERROR;

    if password :#{
        if (password != password2) : return {'message' : "passwords are diferents"}, 400;
        password = sha256(password.encode()).hexdigest()
    #}
    
    image = load_file(image_file, [id], prefix = 'user_image')
    keys : dict = {
        'name' : name,
        'gender' : gender,
        'description' : description,
        'birthdate' : birthdate,
        'password' : password or None,
        'image' : image or '',
    }
    print(f"{id=}")

    keys = {k : keys[k] for k in keys.keys() if keys[k]}
    if len(keys.keys()) == 0 : return {'message' : "insuficient data"}, 500;

    kstring : list = [f" {k} = %({k})s " for k in keys.keys()]
    with (db.get_connection() as conn, conn.cursor() as cur) :#{
        cur.execute(f"""update user set {','.join(kstring)} where id = %(id)s;""", {**keys, 'id' : id});

        if cur.rowcount == 0: return {'message' : 'Error, data not found' }, 404
        conn.commit()

        return {'message' : f"user updated"}, 200
    #}
#}

@validate
def generate_backup(id : str) :#{
    if not id : return {'message' : "user id not provided"}, 400
    if (AUTH_ERROR := auth_get_id(id)) : return AUTH_ERROR

    return generate_json_backup(id)
#}

@validate
def load_backup(id : str, json_file : FileStorage) :#{
    if not id : return {'message' : "id mot provided or it's invalid"}, 400;
    if not json_file : return {"message" : "backup file not provided"}, 400;

    if (AUTH_ERROR := auth_get_id(id)) : return AUTH_ERROR

    json_bk = read_backup_file(json_file)
    if json_bk is None : return {"message" : "File is invalid"}, 400;

    return load_json_backup(json_bk, id);
#}

def format_date(date_str : str) :#{
    if not date_str : return None
    if '-' in date_str : date_str = date_str.replace('-', '/')
    try :#{
        # return datetime.strptime(date_str, "%Y/%m/%d").date()
        return str(datetime.strptime(date_str, "%Y/%m/%d").date())
    #}
    except Exception as err :#{
        print(err)
        return None
    #}
#}



# def get_by_email(email : str ) :#{
#     if not email : return {'message' : "email not provided"}, 400
#     data, status = by_email(email)
#     if status != 200 : return data, status
#     del data['password']
#     return data, 200
# #}

# def get_by_email_for_login(email : str,):#{
#     if not email : return {'message' : "email not provided"}, 400
#     data, status = by_email(email)
#     if status != 200 : return data, status

#     data = { k : data.get(k) for k in ['email','password']}
#     return data, 200
# #}

# def by_email(email : str) :#{
#     if not email : return {'message' : "email not provided"}, 400
#     try :#{
#         cur = conn.cursor()
#         cur.execute("""select id, name, gender, description, email, birthdate, image, available, password
#                     from user where email = %s""", [email]);
        
#         row = cur.fetchone()
#         if cur.rowcount == 0 : return {'message' : "user not found"}, 404
        
#         user = {
#             'id':row[0],
#             'name':row[1],
#             'gender':row[2],
#             'description':row[3],
#             'email':row[4],
#             'birthdate':row[5],
#             'image':row[6],
#             'available':row[7],
#             'password':row[8],
#         }
        
#         # if (not is_for_login) :#{
#         #     if (AUTH_ERROR := auth_get_id(user['id'])) : return AUTH_ERROR
#         # #}
        
#         # if not return_password : del user['password']
#         return user, 200
#     #}
#     except Exception as err :#{
#         print("****")
#         print(type(err))
#         return {"message" : "Some went bad :("}, 500
#     #}
# #}
