from flask import Blueprint, request, g

from src.controllers.GenericController import GenericController
from src.models.GenericModel import GenericModel
import src.controllers.auth
# from src.db.database import DatabaseConnection 

class Generic_router :#{
    def __init__(self, entity_name : str) :#{
        self.router = Blueprint(f'{entity_name}_router', __name__)
        self.controller = GenericController(entity_name)

        self._register_routes()
    #}
    
    def _register_routes(self) :#{
        self.router.route('/',      methods = ['GET'],)(self.get)
        self.router.route('/<id>',  methods = ['GET'],)(self.get_id)
        self.router.route('/',      methods = ['POST'],)(self.post)
        self.router.route('/<id>',  methods = ['PUT'],)(self.put)
        self.router.route('/<id>',  methods = ['DELETE'],)(self.delete)
        self.router.route('/by/user/<user_id>', methods = ['GET'],)(self.get_by_user)
        self.router.route('/by/admin', methods = ['GET'],)(self.get_by_admin)

        self.router.before_request(self.auth_middleware)
    #}
    

    def get(self) :#{
        return self.controller.get() # return src.controllers.gender.get()
    #}

    def get_id(self, id : str) :#{
        return self.controller.get_id(id) # return src.controllers.gender.get_id(id)
    #}

    def post(self) :#{
        image_file = request.files.get('image')
        return self.controller.post(GenericModel(req = request), image_file = image_file)
    #}

    def put(self, id) :#{
        image_file = request.files.get('image')
        return self.controller.put(id, GenericModel(req = request), image_file=image_file)  # return controller.put(id, GenericModel(id = id, req = request), image=image_file)
    #}

    def delete(self, id) :#{
        return self.controller.delete(id)
    #}

    def get_by_user(self, user_id) :#{
        return self.controller.get_by_user(user_id)
    #}

    def get_by_admin(self) :#{
        return self.controller.get_by_admin()
    #}
    

    def auth_middleware(self) :#{
        src.controllers.auth.auth_middleware()
    #}

    # def get_db(se):#{
    #     if ("db" not in g) : g.db = DatabaseConnection().get_connection()
    #     return g.db
    # #}
        
#}
