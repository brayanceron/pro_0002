from src.controllers.GenericController import GenericController
from src.db.database import DatabaseConnection # ,get_connection
from mysql.connector.errors import IntegrityError, DatabaseError
from uuid import uuid4
import src.routes.api.playlist
from src.utils.load_file import load_file
import src.routes.api.gender
import src.routes.api.language
import src.routes.api.sense
import src.routes.api.singer

from src.controllers.auth_controllers.song_auth_controller import auth_get, auth_get_id, auth_post, auth_post_song_, auth_put, auth_get_by_user

# conn = get_connection()
db = DatabaseConnection()
# conn = db.get_connection()


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


@validate
# @require_conecction
def get(extended = False) :#{
    if(AUTH_ERROR := auth_get()) : return AUTH_ERROR;
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
    
        cur.execute("select id, name, description, url, goal, image, user_id  from song")
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

        if (extended and (res := extend(songs))[1] == 200) : return res;
        return songs, 200
    #}
#}
    
@validate
# @require_conecction
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
# @require_conecction
# def post(name : str, description : str, url : str, goal : str, image : str, user_id : str, genders, senses, singers, languages, playlists, music_file, image_file, available : bool = 1, ) :#{
def post(name : str, description : str, url : str, goal : str, user_id : str, genders, senses, singers, languages, playlists, music_file, image_file, available : bool = 1, ) :#{
    url = url if url else load_file(music_file) if music_file else None

    print(f"(not {name} or not {url} or not {user_id} or not {singers} or not {languages})")
    if (not name or not url or not user_id or not singers or not languages):#{
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

@validate
# @require_conecction
def post_song_(entity : list[str], song_id : str, entity_name : str, user_id : str) :#{
    with db.get_connection() as conn, conn.cursor() as cur :#{
        for item in entity :#{
            auth_post_song_(user_id = user_id, entity_id = item, entity_name = entity_name)
            query = f" insert into song_{entity_name}(song_id, {entity_name}_id) values('{song_id}', '{item}'); ";
            cur.execute(query);
        #}
        conn.commit()
    #}
#}

@validate
# @require_conecction
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
# @require_conecction
# name : str, description : str, url : str, goal : str, user_id : str, genders, senses, singers, languages, playlists, music_file, image_file, available : bool = 1,
def put(song_id : str, name : str, description : str, goal : str, user_id : str, genders, senses, singers, languages, playlists, image_file,  available : bool = 1) :#{
    if (not name or not user_id or not singers or not languages):#{
        return {'message' : "Insuficient data"}, 400
    #}

    if (AUTH_ERROR := auth_put(user_id)) : return AUTH_ERROR
    
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
        cur.execute("begin;")
        cur.execute(f"""update song set {" , ".join(kstring)} 
                    where id = %(id)s;""", {**keys, 'id' : song_id})
        print(cur.rowcount)
        conn.commit()
        return f"put route up! ::: {song_id=} {name=} {description=} {goal=} {user_id=} {genders=}  {senses=} {singers=} {languages=} {playlists=} {available=}  {song_id=}", 200
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
                    match (k) :#{
                        case 'gender' : res, status = src.routes.api.gender.get_id(result_id)
                        case 'language' : res, status = src.routes.api.language.get_id(result_id)
                        case 'sense' : res, status = src.routes.api.sense.get_id(result_id)
                        case 'singer' : res, status = src.routes.api.singer.get_id(result_id)
                        case 'playlist' : res, status = src.routes.api.playlist.get_id(result_id)
                    #}
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
# @require_conecction
def get_by_user(user_id : str, extended = False) :#{
    if(not user_id) : return {'message' : "Invalid user id"}, 400
    if(AUTH_ERROR := auth_get_by_user(user_id)): return AUTH_ERROR

    # conn = db.get_connection()
    # cur = conn.cursor()
    with db.get_connection() as conn, conn.cursor() as cur :#{

        cur.execute("""select id, name, description, url, goal, image, user_id 
                    from song where user_id = %s """, [user_id])

        # row = cur.fetchone()
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
        

        # if (extended and (res := extend([song]))[1] == 200) : return res;
        # if (extended and (res := extend([songs]))[1] == 200) : return res[0][0], res[1];
        if (extended and (res := extend(songs))[1] == 200) : return res;
        return songs, 200
    #}
#}

@validate
# @require_conecction
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
# @require_conecction
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
# @require_conecction
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
# @require_conecction
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

def generate() :#{
    # especify ars necesary
    return {'message' : "okey"}
#}

def teardown_db():#{
    db.close_global_connection()
#}



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