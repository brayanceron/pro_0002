from flask import Blueprint, request, Response, send_file
import src.controllers.user
import src.controllers.auth

user_router = Blueprint('user_router', __name__)


# TODO: enable endpoint get by user entity
# @user_router.route('/')
# def get() :#{
#     return src.controllers.user.get()
# #}
keys = ['name', 'gender', 'description', 'email', 'birthdate', 'password', 'password2'] # 'available'

@user_router.route('/<id>')
def get_id(id : str) :#{
    return src.controllers.user.get_id(id)
#}

@user_router.route('/by/email') # @user_router.route('/by/email/<email>')
def get_by_email() :#{
    data = dict(request.get_json())
    email = data.get('email', None)
    return src.controllers.user.get_by_email(email)
#}

@user_router.route('/', methods = ['POST']) # This route is different to signup
def post() :#{
    form = dict(request.form)
    image_file = request.files.get('image')
    form = { k : form.get(k) for k in keys }

    return src.controllers.user.post(**form, image_file = image_file, to_login = request.args.get('to_login', False))
#}

@user_router.route('/<id>', methods = ['PUT'])
def put(id : str) :#{
    form = request.form
    form = {k : form.get(k) for k in keys}
    image = request.files.get('image')
    print(f'{form=}')

    return src.controllers.user.put(**form, id = id, image_file = image)
#}


@user_router.route('/generate_backup/<id>')
def generate_backup(id : str) -> tuple[dict[str, str], int] :#{
    result, status = src.controllers.user.generate_backup(id)
    if(status != 200) : return result, status;

    # return send_file(result.encode(), 'text/json', download_name="backup")

    # res = Response(result.encode(), headers = {'Content-Disposition': 'attachment; filename="backup.json"'}, mimetype = 'text/json; charset=utf-8');
    # return res
    return Response(result.encode(), headers = {'Content-Disposition': 'attachment; filename="backup.json"'}, mimetype = 'text/json; charset=utf-8');
#}

@user_router.route('/load_backup/<id>', methods = ['POST'])
def load_backup(id : str) :#{
    json_file = request.files.get('backup_file')
    return src.controllers.user.load_backup(id, json_file)

    # result, status =  src.controllers.user.load_user_backup(id, json_file)
    # return result, status;
#}

@user_router.before_request
def auth_middleware_() :#{
    src.controllers.auth.auth_middleware()
#}
