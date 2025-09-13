from mysql.connector.errors import IntegrityError, DatabaseError
# from Backend.src.controllers.auth import extract_token
from src.utils.load_file import load_file
from src.db.database import DatabaseConnection # ,get_connection
from src.models.GenericModel import GenericModel
from src.controllers.auth_controllers.generic_auth_controller import auth_get, auth_get_id, auth_put, auth_delete, auth_get_by_user
# import werkzeug.exceptions

class GenericController :#{
    def __init__(self, entity : str):#{
        self.entity = entity
        self.db = DatabaseConnection()

        self.cols = ' '+', '.join(GenericModel.get_array_cols())
    #}

    def validate(func) :#{
        def wrap(self, *args, **kwargs):#{
            try :#{
                # self.conn = self.db.get_connection()
                # self.cursor =self.conn.cursor()
                result, state = func(self, *args, **kwargs)
                # self.conn.close()
                return result, state
            #}
            except IntegrityError as errint :#{
                print(errint)
                return {'message' : 'eror : Integrity Error'}, 500
                # return {'message' : 'error, the registr to delete is used in other plece'}, 500
            #}
            except DatabaseError as err :#{
                print(err)
                print(type(err))
                return {'message' : 'There are probles whit Data Base, try later'}, 500 
            #}
            except Exception as err :#{
                print(err)
                print(type(err))
                return {'message' : 'error, operation not completed'}, 500 # return {'message' : f'error, operation not completed: {err}'}, 500
            #}
            # except werkzeug.exceptions.Forbidden as err:#{
            #     print(err)
            #     return {'message' : 'Forbiden'}, 403
            # #}
        #}
        return wrap
    #}
    
    @validate
    def get(self) :#{
        if (AUTH_ERROR := auth_get()) : return AUTH_ERROR
        
        query = f"select {self.cols} from {self.entity}"
        result : list[GenericModel] = []

        with self.db.get_connection() as conn, conn.cursor() as cursor :#{
            
            cursor.execute(query)
            rows = cursor.fetchall()
            if (cursor.rowcount == 0 ): return {'message' : 'error, data not found' }, 404
            
            for row in rows :#{
                result.append(GenericModel(*row).to_dict())
            #}
            return result, 200
        #}
    #}

    @validate
    def get_id(self, id : str) :#{
        query =f"select {self.cols} from {self.entity} where id = %s"

        with self.db.get_connection() as conn, conn.cursor() as cursor :#{
            cursor.execute(query, [id])

            row = cursor.fetchone()
            if (cursor.rowcount == 0 ): return {'message' : 'error, data not found' }, 404
            result = GenericModel(*row).to_dict()

            if(AUTH_ERROR := auth_get_id(result['user_id'])) : return AUTH_ERROR
            return result, 200
        #}
    #}

    @validate
    def post(self, new_entity : GenericModel, image_file) :#{
        new_entity.image = load_file(image_file, "gender_image") or ''
        
        keys, dict_data = new_entity.get_data_struct()
        query = f"insert into {self.entity}({', '.join(keys)}) values({','.join([ f'%({k})s' for k in keys])})" # f"insert into {self.entity}({', '.join(list(data.keys()))}) values({f' %({')s, %('.join(list(data.keys()))})s '})" 
        
        with self.db.get_connection() as conn, conn.cursor() as cursor :#{
            cursor.execute(query, dict_data)
            conn.commit()
            return {"message" : f"{self.entity} registered", 'id' : dict_data.get('id')}, 200
        #}
    #}

    @validate
    def put(self, id : str, new_entity : GenericModel, image_file) :#{
        old_entity, status = self.get_id(id)
        if(status != 200) : return old_entity, status
        if (AUTH_ERROR := auth_put(old_entity['user_id'])) : return AUTH_ERROR # if (AUTH_ERR := auth_put(id)) : return AUTH_ERR
        new_entity.image = load_file(image_file, "gender_image") or ''

        keys, dict_data = new_entity.get_data_struct()
        if (not new_entity.image) :#{ #This for not delete image if it is not provided
            keys.remove('image')
            del dict_data['image']
        #}
        query = f"update {self.entity} set {', '.join([f'{k} = %({k})s' for k in keys])} where id = %(id)s" # return f"insert into {self.entity}({', '.join(list(data.keys()))}) values({f' %({')s, %('.join(list(data.keys()))})s '})"

        with self.db.get_connection() as conn, conn.cursor() as cursor :#{
            cursor.execute(query, {**dict_data, 'id' : id})
    
            if cursor.rowcount == 0: return {'message' : 'Error, data not found' }, 404
    
            conn.commit() 
            return {'message' : f"{self.entity} updated"}, 200
        #}
    #}
    
    @validate
    def delete(self, id : str) :#{
        # data, err = extract_token()
        result, status = self.get_id(id)
        if (status != 200) : return result, status
        if(AUTH_ERR := auth_delete(result['user_id'])) : return AUTH_ERR

        query = f"delete from {self.entity} where id = %s"
        with self.db.get_connection() as conn, conn.cursor() as cursor :#{

            cursor.execute(query, [id])
            # query = f"delete from {self.entity} where id = %s and user_id = %s"
            # self.cursor.execute(query, [id, data['user_id']])

            if cursor.rowcount == 0: return {'message' : 'Error, data not found' }, 404

            conn.commit()
            return {'message' : f"{self.entity} deleted"}, 200
        #}
    #}
    
    @validate
    def get_by_user(self, user_id : str) :#{
        if (AUTH_ERROR := auth_get_by_user(user_id)) : return AUTH_ERROR
        

        query = f"select {self.cols} from {self.entity} where user_id = %s"
        result : list[GenericModel] = []
        with self.db.get_connection() as conn, conn.cursor() as cursor :#{
            cursor.execute(query, [user_id])
    
            rows = cursor.fetchall()
            if (cursor.rowcount == 0 ): return {'message' : 'error, data not found' }, 404
            
            for row in rows :#{
                result.append(GenericModel(*row).to_dict())
            #}
            return result, 200
        #}
    #}

    @validate
    def get_by_admin(self) :#{
        return self.get_by_user('admin')
    #}
    
    # @app.teardown_appcontext
    def teardown_db(exception):#{
        pass
        # close_db()
    #}
        
#}



