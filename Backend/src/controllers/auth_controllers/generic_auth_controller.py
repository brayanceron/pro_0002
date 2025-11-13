# from src.controllers.auth import get_auth_user
from src.controllers.auth import whoami

def auth_get() -> tuple | None :#{
    """only if user is admin"""
    # data, _ = get_auth_user() # data token is validated in auth middleware
    data, _ = whoami() # data token is validated in auth middleware
    if(data['id'] != 'admin') : return {"message" : "user must be admin"}, 403
#}

def auth_get_id(user_id_of_item : str) ->  tuple | None :#{
    user_data, _ = whoami() # INFO data token is validated in auth middleware // BUG generate error if the route doesn't has auth muiddleware 
    if (user_data['id'] == 'admin' or user_id_of_item == 'admin') : return None
    # print(f"{user_data['id']=} -> {user_id_of_item}" )
    if (user_id_of_item != user_data['id']) : return {"message" : "Forbiden"}, 403  # if (user_data['id'] != user_id_of_item) : return {"message" : "Forbiden"}, 403
#}

def auth_put(user_id_of_item) :#{
    user_data, _ = whoami() # data token is validated in auth middleware

    if user_data['id'] == 'admin' : return None
    print(f"{user_data['id']=} -> {user_id_of_item}" )
    if (user_id_of_item != user_data['id']) : return {"message" : "Forbiden"}, 403
#}

def auth_delete(user_id_of_item) :#{
    user_data, _ = whoami() # data token is validated in auth middleware

    if user_data['id'] == 'admin' : return None
    if (user_id_of_item != user_data['id']) : return {"message" : "Forbiden"}, 403
#}

def auth_get_by_user(user_id_of_item : str) :#{
    return auth_get_id(user_id_of_item)
#}
