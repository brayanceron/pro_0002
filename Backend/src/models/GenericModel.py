from flask import Request,Response, abort
from uuid import uuid4
import json

class GenericModel :#{
    def __init__(self, id : str = '', name : str = '', description : str = '', user_id : str = '', score : float = -1, image : str = '', available = 1, req : Request | None = None) :#{
        #image
        if req :#{
            data = self.extract_data(req)
            data['id'] = data['id'] if data.get('id') else id
            self.set_data(**data)
            return
        #}
        self.set_data(id, name, description, user_id, score, image, available)
        self.keys = []
    #}

    def set_data(self, id : str = '', name : str = '', description : str = '',  user_id : str = '', score : float = -1, image : str = '', available = 1) :#{
        if (not name or not user_id) : return abort(Response(b'{"message" : "incomplete fields"}', 400, content_type='application/json'))

        self.id : str = id if id else uuid4().hex # if not exist id, create
        self.name : str= name
        self.description : str= description
        self.score : str= score
        self.image : str= image
        self.available : int= available
        self.user_id : str= user_id #Error if user_id not exist
    #}
    
    
    def to_json(self) :#{
        return json.dumps(self.to_dict())
    #}

    def to_dict(self) -> dict :#{
        return {
            'id' : self.id,
            'name' : self.name,
            'description' : self.description,
            'user_id' : self.user_id,
            'score' : self.score,
            'image' : self.image,
            'available' : self.available,
        }
    #}
    
    def extract_data(self, request : Request) :#{
        keys = ['id', 'name', 'description', 'user_id', 'score', 'image', 'available'] # keys = ['name', 'description', 'user_id', 'image', 'available']
        form_data = dict(request.form)
        data = { k : form_data.get(k) for k in form_data if k in keys }

        return data
    #}

    @staticmethod
    def get_array_cols() :#{
        return ['id', 'name', 'description', 'user_id', 'score', 'image', 'available' ]
    #}
    
    def get_data_struct(self) :#{
        return GenericModel.get_array_cols(), self.to_dict()
    #}
#}
