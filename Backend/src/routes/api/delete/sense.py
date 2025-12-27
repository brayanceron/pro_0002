from flask import Blueprint, request
from src.controllers.GenericController import GenericController
from src.models.GenericModel import GenericModel

sense_router = Blueprint('sense_router', __name__)
controller = GenericController('sense')

@sense_router.route('/')
def get() :#{
    return controller.get() # return src.controllers.gender.get()
#}

@sense_router.route('/<id>')
def get_id(id : str) :#{
    return controller.get_id(id) # return src.controllers.gender.get_id(id)
#}

@sense_router.route('/', methods = ['POST'])
def post() :#{
    image_file = request.files.get('image')
    return controller.post(GenericModel(req = request), image_file = image_file)
#}

@sense_router.route('/<id>', methods = ['PUT'])
def put(id) :#{
    image_file = request.files.get('image')
    return controller.put(id, GenericModel(req = request), image_file=image_file)  # return controller.put(id, GenericModel(id = id, req = request), image=image_file)
#}

@sense_router.route('/<id>', methods = ['DELETE'])
def delete(id) :#{
    return controller.delete(id);
#}
