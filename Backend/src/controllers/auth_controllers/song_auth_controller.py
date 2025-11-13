from src.controllers.auth import get_auth_user, whoami
from src.db.database import DatabaseConnection #,get_connection

# conn = get_connection()
# db = DatabaseConnection()


def auth_get() :#{
    # data, _ = get_auth_user()
    data, _ = whoami() # data token is validated in auth middleware
    if(data['id'] != 'admin') : return {"message" : "user must be admin"}, 403
#}

def auth_get_id(user_id_of_item : str) :#{
    # data, _ = get_auth_user()
    data, _ = whoami() # data token is validated in auth middleware
    if data['id'] == 'admin' : return None
    if(data['id'] != user_id_of_item) : return {'message' : "Forbiden"}, 403
#}

def auth_post(user_id_of_item : str) :#{
    user_data, status = whoami();
    # if (status != 200) : return {'message' : "Unauthorize"}, 401
    if user_data['id'] == 'admin' : return None;
    if(user_data['id'] != user_id_of_item) : return {'message' : f"User {user_id_of_item} don't have permission for adding songs to user{user_data['id']}"}, 403 
#}

def auth_put(user_id_of_item : str) :#{
    user_data, _ = whoami() # data token is validated in auth middleware
    print(f"AUTH PUT { user_data['id']=} = {user_id_of_item=}")
    if user_data['id'] == 'admin' : return None
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

def auth_post_song_(user_id : str, entity_id : str, entity_name, conn) :#{
    try :#{
        with conn.cursor() as cur :#{
            cur.execute("""select user_id from %s  where id = %s;""", [entity_name, entity_id]);
            row = cur.fetchone()
            if(cur.rowcount == 0) : return {'message' : f"{entity_name} not found" }, 404
            gotten_user_id = row[0]
            if(gotten_user_id == 'admin') : return None
            if(gotten_user_id != user_id) : return {'message' : f"{entity_name} whit id {entity_id} Forbiden" }, 403
            return None
        #}
    #}
    except :#{
        return {'message' : "Some went bad verifying authorization :("}, 500
    #}
#}
