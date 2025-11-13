from flask import Blueprint, request
import src.controllers.auth
import src.controllers.user

auth_router = Blueprint('auth_router', __name__)

# TODO implement function validate

@auth_router.route('/login', methods = ['POST'])
def login() :#{
    #TODO  verivy if already exist a session
    data = request.get_json()
    data = { k : data[k] for k in ['email', 'password']}
    # print(data)
    return src.controllers.auth.login(**data)
#}

@auth_router.route('/logout')
def logout() :#{
    #TODO  verivy if already exist a session
    return src.controllers.auth.logout()
#}


@auth_router.route('/signup', methods = ['POST'] ) # This route is different to post user
def sign_up() :#{
    keys = ['name', 'gender', 'description', 'email', 'birthdate', 'password', 'password2'] # 'available'
    form : dict = dict(request.form)
    form = { k : form[k] for k in keys }
    image = request.files.get('image')

    return src.controllers.user.post(**form, image_file = image, req_auth = False, to_login = request.args.get('to_login', False))
#}

@auth_router.route('/whoami')
def whoami() :#{
    return src.controllers.auth.whoami()
#}
