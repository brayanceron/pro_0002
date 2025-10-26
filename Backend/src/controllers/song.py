from src.controllers.GenericController import GenericController
from src.db.database import DatabaseConnection # ,get_connection
from mysql.connector.errors import IntegrityError, DatabaseError
from uuid import uuid4
from json import dumps, loads
from datetime import datetime
from src.utils.load_file import load_file
from src.controllers.GenericController import GenericController
from flask import g

from src.controllers.auth_controllers.song_auth_controller import auth_get, auth_get_id, auth_post, auth_post_song_, auth_put, auth_get_by_user

db = DatabaseConnection()

def validate(func) :#{
    def wrap(*args, **kwargs) :#{
        try :#{
            result, state = func(*args, **kwargs)
            return result, state
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

def format_pagination_parameters(page : str, limit : str) :#{
    try :#{
        page = int(page)
        limit = int(limit)
        if limit == -1: return page, limit, None
        if(not page >= 1 or not limit >= 1) : return None, None, "pagination parameters can't be negative"
        return page, limit, None
    #}
    except :#{
        return None, None, "invalid pagination parameters"
    #}
#}

@validate
def get(page : str = '1', limit : str = '10', extended = False) :#{
    if(AUTH_ERROR := auth_get()) : return AUTH_ERROR;
    
    page, limit, msg = format_pagination_parameters(page, limit)
    if (not page or not limit) : return {'message' : msg}, 400
    offset = (page - 1) * limit
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
    
        # cur.execute("select id, name, description, url, goal, image, user_id  from song")
        cur.execute(f"select id, name, description, url, goal, image, user_id  from song {"limit %s offset %s" if limit != -1 else ''}",
                    [limit, offset][0:None if limit != -1 else 0])
        rows = cur.fetchall()

        if(cur.rowcount == 0) : return {'message' : 'error, data not found'} , 404

        songs : list = []
        for row in rows :#{
            songs.append({
                'id' : row[0],
                'name' : row[1],
                'description' : row[2],
                'url' : row[3],
                'goal' : row[4],
                'image' : row[5],
                'user_id' : row[6]
            })
        #}

        count_sng, status = count("%")
        if status != 200 : return count_sng, status

        if (extended and (res := extend(songs))[1] == 200) : return {'data' : res[0], 'count' : count_sng.get('count')}, 200;
        return {'data' : songs, 'count' : count_sng.get('count')}, 200
    #}
#}
    
@validate
def get_id(id, extended = False) :#{
    if not id : return {'message' : "song id not provided"}, 400

    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute("""
            select id, name, description, url, goal, image, user_id from song where id = %s
        """, [id])

        row = cur.fetchone()
        if cur.rowcount == 0 : return {'message' : 'data not found'}, 404
        
        song = {
            'id': row[0],
            'name': row[1],
            'description': row[2],
            'url': row[3],
            'goal': row[4],
            'image': row[5],
            'user_id': row[6],
        }

        if(AUTH_ERROR := auth_get_id(song['user_id'])): return AUTH_ERROR

        # if (extended and (res := extend([song]))[1] == 200) : return res;
        if (extended and (res := extend([song]))[1] == 200) : return res[0][0], res[1];
        return song, 200
    #}
#}

# ====================================================================================================

@validate
def post(name : str, description : str, url : str, goal : str, user_id : str, genders, senses, singers, languages, playlists, music_file, image_file, available : bool = 1, ) :#{
    url = url if url else load_file(music_file) if music_file else None

    print(f"(not {name} or not {url} or not {user_id} or not {singers} or not {languages})")
    singers = singers or ['unknown']
    languages = languages or ['unknown']
    if (not name or not url or not user_id):#{
        return {'message' : "Insuficient data"}, 400
    #}
    if (AUTH_ERROR := auth_post(user_id)) : return AUTH_ERROR
    
    image = load_file(image_file, 'song_image') or ''
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
        id = uuid4().hex
        cur.execute("""insert into song(id, name, description, url, goal, image, user_id, available) 
                    values( %s, %s, %s, %s, %s, %s, %s, %s )""", (id, name, description, url, goal, image, user_id, available,));
        conn.commit()

        post_song_(genders, id, 'gender', user_id)
        post_song_(playlists, id, 'playlist', user_id)
        post_song_(singers, id, 'singer', user_id)
        post_song_(languages, id, 'language', user_id)
        post_song_senses(senses, id, user_id, goal)

        return {'message' : "song registered", 'id' : id}, 200
    #}
#}

# @validate # INFO if validate is disabled this function cut all operation(POST/PUT)
def post_song_(entity : list[str], song_id : str, entity_name : str, user_id : str) :#{
    # TODO verify if already exist repeating rows with same data
    print("------------------------")
    print(f"{entity_name=}")
    print(f"{entity=}")
    with db.get_connection() as conn, conn.cursor() as cur :#{
        for item in entity :#{
            auth_post_song_(user_id = user_id, entity_id = item, entity_name = entity_name) #FIXME this doesn't anything
            # TODO validate query doesn't reach exception
            query = f" insert into song_{entity_name}(song_id, {entity_name}_id) values('{song_id}', '{item}'); ";
            print(f"{query=}")
            cur.execute(query);
            print("oki")
        #}
        conn.commit()
        print("doki")
    #}
#}

@validate
def post_song_senses(senses : list, song_id : str, user_id, goal : int = 0):#{
    with db.get_connection() as conn, conn.cursor() as cur :#{
        for sense in senses:#{
            query = f"insert into song_sense(song_id, sense_id, goal, user_id) values('{song_id}','{sense}','{goal}','{user_id}')"
            cur.execute(query)
        #}
        conn.commit()
    #}
#}

@validate
# name : str, description : str, url : str, goal : str, user_id : str, genders, senses, singers, languages, playlists, music_file, image_file, available : bool = 1,
def put(song_id : str, name : str, description : str, goal : str, user_id : str, genders, senses, singers, languages, playlists, image_file,  available : bool = 1) :#{
    singers = singers if len(singers) > 0  else ['unknown']
    languages = languages if len(singers) > 0  else ['unknown']
    # if (not name or not user_id or not singers or not languages):#{
    if (not name or not user_id):#{
        return {'message' : "Insuficient data"}, 400
    #}

    if (AUTH_ERROR := auth_put(user_id)) : return AUTH_ERROR
    
    # BUG: -> image must save in user folder
    image = load_file(image_file) or ''
    keys : dict = {
        'name': name,
        'description': description,
        'goal': goal,
        'image': image,
        'available': available,
        # 'id' : song_id,
    }
    
    if not image : del keys['image'] #keys.pop(3)

    kstring = [ f" {k} = %({k})s" for k in keys.keys()]
    with db.get_connection() as conn, conn.cursor() as cur :#{
        # cur.execute("begin;")
        cur.execute(f"""update song set {" , ".join(kstring)} 
                    where id = %(id)s;""", {**keys, 'id' : song_id})
        print(cur.rowcount)
        conn.commit()

        # DELETING BEFORE DATA
        delete_song_(song_id, 'gender', user_id)
        delete_song_(song_id, 'playlist', user_id)
        delete_song_(song_id, 'singer', user_id)
        delete_song_(song_id, 'language', user_id)
        delete_song_(song_id, 'sense', user_id)

        print("pass****")

        # INSERTING NEW DATA
        post_song_(genders, song_id, 'gender', user_id)
        post_song_(playlists, song_id, 'playlist', user_id)
        post_song_(singers, song_id, 'singer', user_id)
        post_song_(languages, song_id, 'language', user_id)
        post_song_senses(senses, song_id, user_id, goal)
        print("OKIII")

        return {"message" : "song update successfully"}, 200
    #}
    # TODO update {genders=}  {senses=} {singers=} {languages=} {playlists=} of a song
#}

def delete_song_(song_id : str, entity_name : str, user_id : str) :#{
    with db.get_connection() as conn, conn.cursor() as cur :#{
        # TODO validate query doesn't reach exception
        q = f"delete from song_{entity_name} where song_id = %s"
        print(q)
        cur.execute(q, [song_id])
        conn.commit()
    #}
#}

# ====================================================================================================

def extend(songs : list) :#{

    with db.get_connection() as conn, conn.cursor() as cur :#{
        for song in songs :#{
            keys = ['gender','language','sense','singer', 'playlist']
            dic_list : dict = { k : [] for k in keys }

            for k in keys :#{
                cur.execute(f"select {k}_id from song_{k} where song_id = " + "%s", [ song['id']])
                results_ids = cur.fetchall(); results_ids = [i[0] for i in results_ids if i];
                for result_id in results_ids :#{
                    res, status = [], 500
                    ctrl = GenericController(k)
                    res, status = ctrl.get_id(result_id)
                    """ match (k) :#{
                        case 'gender' : res, status = src.routes.api.gender.get_id(result_id)
                        case 'language' : res, status = src.routes.api.language.get_id(result_id)
                        case 'sense' : res, status = src.routes.api.sense.get_id(result_id)
                        case 'singer' : res, status = src.routes.api.singer.get_id(result_id)
                        case 'playlist' : res, status = src.routes.api.playlist.get_id(result_id)
                    #}
                    if status == 200 : dic_list[k].append(res) """
                    if status == 200 : dic_list[k].append(res)
                #}
            #}

            # song |= dic_list 
            song.update({f"{k2}s": dic_list[k2]  for k2 in keys})
        #}
        
        return songs, 200
    #}
#}

@validate
def get_by_user(user_id : str, page : str = '1', limit : str = '10', extended = False) :#{
    if(not user_id) : return {'message' : "Invalid user id"}, 400
    if(AUTH_ERROR := auth_get_by_user(user_id)): return AUTH_ERROR

    page, limit, msg = format_pagination_parameters(page, limit)
    if (not page or not limit) : return {'message' : msg}, 400
    offset = (page - 1) * limit

    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute(f"""select id, name, description, url, goal, image, user_id 
                    from song where user_id = %s {"limit %s offset %s" if limit != -1 else ''}""", 
                    [user_id, limit, offset][0:None if limit != -1 else 1])

        rows = cur.fetchall()
        if cur.rowcount == 0 : return {'message' : 'data not found'}, 404
        
        songs = []
        for row in rows :#{
            songs.append({
                'id': row[0],
                'name': row[1],
                'description': row[2],
                'url': row[3],
                'goal': row[4],
                'image': row[5],
                'user_id': row[6],
            })
        #}
        
        count_sng, status = count(user_id)
        if status != 200 : return count_sng, status

        if (extended and (res := extend(songs))[1] == 200) : return {'data' : res[0], 'count' : count_sng.get('count')}, 200;
        return {'data' : songs, 'count' : count_sng.get('count')}, 200
    #}
#}

#TODO paginate endpoinst "get_by"
@validate
def get_by_gender(gender_id : str) :#{
    if not gender_id : return {'message' : "Invalid gender id"}, 400

    with db.get_connection() as conn, conn.cursor() as cur :#{

        cur.execute("""select id, name, description, url, goal, image, user_id, gender_id 
            from song join song_gender on song.id = song_gender.song_id
            where song_gender.gender_id = %s""", [gender_id])

        rows = cur.fetchall()
        if cur.rowcount == 0 : return {'message' : "data not found"}, 404

        songs : list = []
        for row in rows :#{
            songs.append({
                'id' : row[0],
                'name' : row[1],
                'description' : row[2],
                'url' : row[3],
                'goal' : row[4],
                'image' : row[5],
                'user_id' : row[6],
                'gender_id' : row[7],
            })
        #}
        
        return songs, 200
    #}
#}

@validate
def get_by_playlist(playlist_id : str) :#{
    if (not playlist_id) : return {'message' : "Invalid playlist id"}, 400

    with db.get_connection() as conn, conn.cursor() as cur :#{

        cur.execute("""select id, name, description, url, goal, image, user_id, playlist_id 
                    from song join song_playlist on song.id = song_playlist.song_id 
                    where song_playlist.playlist_id = %s""", [playlist_id])

        rows = cur.fetchall()
        if cur.rowcount == 0 : return {'message' : "data not found"}, 404

        songs : list = []
        for row in rows :#{
            songs.append({
                'id' : row[0],
                'name' : row[1],
                'description' : row[2],
                'url' : row[3],
                'goal' : row[4],
                'image' : row[5],
                'user_id' : row[6],
                'playlist_id' : row[7],
            })
        #}
        
        return songs, 200
    #}
#}

@validate
def get_by_sense(sense_id : str) :#{
    if not sense_id : return {'message' : "Invalid sense id"}, 400
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute("""select id, name, description, url, song.goal, image, song.user_id from 
                    song join song_sense on song.id = song_sense.song_id 
                    where song_sense.sense_id = %s""", [sense_id])

        rows = cur.fetchall()
        if(cur.rowcount == 0) : return {'message' : "data not found"}, 404
        songs = []

        for row in rows :#{
            songs.append({
                'id' : row[0],
                'name' : row[1],
                'description' : row[2],
                'url' : row[3],
                'goal' : row[4],
                'image' : row[5],
                'user_id' : row[6],
            })
        #}
        
        return songs, 200
    #}
#}

@validate
# @require_conecction
def get_by_singer(singer_id : str) :#{
    if not singer_id : return {'message' : "Invalid sense id"}, 400

    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute("""select id, name, description, url, goal, image, user_id from 
                    song join song_singer on song.id = song_singer.song_id 
                    where song_singer.singer_id= %s""", [singer_id])

        rows = cur.fetchall()
        if(cur.rowcount == 0) : return {'message' : "data not found"}, 404
        songs = []

        for row in rows :#{
            songs.append({
                'id' : row[0],
                'name' : row[1],
                'description' : row[2],
                'url' : row[3],
                'goal' : row[4],
                'image' : row[5],
                'user_id' : row[6],
            })
        #}
        
        return songs, 200
    #}
#}

@validate
def get_by_language(language_id : str):#{
    if not language_id : return {'message' : "invalid language id"}
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute("""select id, name, description, url, goal, image, user_id
                    from song join song_language on song.id = song_language.song_id
                    where song_language.language_id = %s""", [language_id]);
        rows = cur.fetchall()
        if cur.rowcount == 0 : return {'message' : "data not found"}, 404

        songs : list = []
        for row in rows :#{
            songs.append({
                'id': row[0],
                'name': row[1],
                'description': row[2],
                'url': row[3],
                'goal': row[4],
                'image': row[5],
                'user_id': row[6],
            })
        #}

        return songs, 200
    #}
#}

#TODO this way of generate is too basic, it must be moplexer
@validate
def generate(genders : list[str], senses : list[str], singers : list[str], languages : list[str], goal : float, user_id : str) :#{
    if(AUTH_ERROR := auth_get_id(user_id)): return AUTH_ERROR #Validate that the user is the same as the one who logged in. 
    
    if (not user_id): return {'message' : "Insuficient data"}, 400;
    if (not genders and not senses and not singers and not languages and not goal): return {'message' : "Insuficient data"}, 400;

    # TODO validate auth user is equal to user_id

    q = f"""
    select distinct song.id, song.name, song.description, song.url, song.goal, song.image, song.user_id 
    from 
    song 
    {'join song_gender on song.id = song_gender.song_id' if genders else ''}
    {'join song_sense on song.id = song_sense.song_id' if senses else ''}
    {'join song_singer on song.id = song_singer.song_id' if singers else ''}
    {'join song_language on song.id = song_language.song_id' if languages else ''}

    where 
    {f"song_gender.gender_id in ({','.join([f"'{g}'" for g in genders])}) and" if genders else ''}
    {f"song_sense.sense_id in ({','.join([f"'{s}'" for s in senses])}) and" if senses else ''}
    {f"song_singer.singer_id in ({','.join([f"'{sg}'" for sg in singers])}) and" if singers else ''}
    {f"song_language.language_id in ({','.join([f"'{l}'" for l in languages])}) and" if languages else ''}
    song.goal >= {goal if float(goal) > 0 else -1} and
    song.user_id = '{user_id}'
    """

    with db.get_connection() as conn, conn.cursor() as cur :#{
        songs = []
        cur.execute(q)
        rows = cur.fetchall()
        if cur.rowcount == 0 : return {'message' : "Data not found with those parameters"}, 404
        for r in rows :#{
            songs.append({
                'id' : r[0],
                'name' : r[1],
                'description' : r[2],
                'url' : r[3],
                'goal' : str(r[4]),
                'image' : r[5],
                'user_id' : r[6],
            })
        #}
        generated_by : dict = { # generated_by = { f"{k=}".split('=')[0] : k for k in [genders, senses, singers, languages, goal] if k }
            'genders' : genders,
            'senses' : senses,
            'singers' : singers,
            'languages' : languages,
            'goal' : str(goal) if float(goal) > 0 else -1 # 'goal' : goal,
        }
        generated_by = { k : generated_by[k] for k in generated_by.keys() if generated_by[k]}
        g.setdefault('conn', conn)  # g.setdefault(cur)
        save_generated_playlists(songs, generated_by, user_id)
        return songs, 200
    #}
#}

def save_generated_playlists(pl : list, generated_by : dict, user_id : str) :#{
    if (not pl or not generated_by or not user_id) : return None;

    try :#{
        json_data = dumps({
            'playlist' : pl,
            'generated_by' : generated_by,
            'user_id' : user_id,
        })

        dt = datetime.now()
        late = 5
        conn = g.get('conn')
        with conn.cursor() as cur :#{
            cur.execute("insert into temp_playlist(user_id, json_data, created_at) values (%s, %s, %s)",[user_id, json_data, dt])
            # cur.fetchall()
            
            query = f"""
            delete from `temp_playlist` as t1 
            where user_id = %s and t1.created_at < (select * from (select created_at from `temp_playlist` as t2 
                where t2.user_id = %s order by t2.created_at desc limit 1 {f'offset {offset}' if ((offset := late - 1) > 0) else ''}) as subquery)
            """
            cur.execute(query, [user_id, user_id])
            cur.fetchall() # INFO - here is processing data for releasing buffer, otherwise it doesn't work

            conn.commit()
            return json_data
        #}
    #}
    except Exception as err :#{
        print(err)
        import traceback
        traceback.print_exc()
    #}
    return None
#}

@validate
def get_generated_playlists(user_id : str) :#{
    if not user_id : return {'message' : "user id not provided"}, 400
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
        # cur.execute("select json_data, created_at from temp_playlist where user_id = %s order by created_at desc limit 1;", [user_id])
        cur.execute("select json_data, created_at from temp_playlist where user_id = %s order by created_at desc", [user_id])
        pls = cur.fetchall()
        
        if cur.rowcount == 0 : return {'message' : "data not found"}, 404
        history = []
        for p in pls:#{
            history.append({
                "json_data" : loads(p[0]),
                "created_at" : p[1],  # "created_at" : str(p[1]),
            })
        #}

        if(AUTH_ERROR := auth_get_id(history[0].get('json_data').get('user_id'))): return AUTH_ERROR
        return history, 200
    #}
#}

@validate
def count(user_id : str) :#{
    with db.get_connection() as conn, conn.cursor() as cur :#{
        # TODO: validat authorization
        cur.execute("select count(*) from song where user_id = %s",[user_id]);
        row = cur.fetchone()
        count = row[0]
        return {'count' : count}, 200
    #}
#}


def teardown_db():#{
    db.close_global_connection()
#}


# def require_conecction(func) :#{
#     # def wrap(self, *args, **kwargs):#{
#     def wrap(*args, **kwargs):#{
#         conn = db.get_connection()
#         # self.cursor =self.conn.cursor()
#         result, status = func(*args, **kwargs)
#         # self.conn.close()
#         conn.close();
#         return result, status
#     #}
#     return wrap
# #}

# def post_song_gender(genders : list[str], song_id : str) :#{
#     print(song_id)
#     print(genders)
#     query = "";
#     for gender in genders :#{
#         query += f" insert into song_gender(song_id, gender_id) values('{song_id}', '{gender}'); ";
#     #}
#     print(query)
#     conn = get_connection()
#     cur = conn.cursor()
#     cur.execute(query);
#     conn.commit()
#     conn.close()
# #}
