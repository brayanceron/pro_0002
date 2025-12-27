from flask import Blueprint, request
from src.controllers.GenericController import GenericController
from src.models.GenericModel import GenericModel
import src.controllers.auth

gender_router = Blueprint('gender_router', __name__)
controller = GenericController('gender')

@gender_router.route('/')
def get() :#{
    return controller.get() # return src.controllers.gender.get()
#}

@gender_router.route('/<id>')
def get_id(id : str) :#{
    return controller.get_id(id) # return src.controllers.gender.get_id(id)
#}

@gender_router.route('/', methods = ['POST'])
def post() :#{
    image_file = request.files.get('image')
    return controller.post(GenericModel(req = request), image_file = image_file)
#}

@gender_router.route('/<id>', methods = ['PUT'])
def put(id) :#{
    image_file = request.files.get('image')
    return controller.put(id, GenericModel(req = request), image_file=image_file)  # return controller.put(id, GenericModel(id = id, req = request), image=image_file)
#}

@gender_router.route('/<id>', methods = ['DELETE'])
def delete(id) :#{
    return controller.delete(id)
#}

@gender_router.route('/by/user/<user_id>')
def get_by_user(user_id) :#{
    return controller.get_by_user(user_id)
#}

@gender_router.before_request
def auth_middleware() :#{
    src.controllers.auth.auth_middleware()
#}
