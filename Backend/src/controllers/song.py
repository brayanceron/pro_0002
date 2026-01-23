from src.controllers.GenericController import GenericController
from src.db.database import DatabaseConnection # ,get_connection
from mysql.connector.errors import IntegrityError, DatabaseError
from uuid import uuid4
from json import dumps, loads
from datetime import datetime
from src.utils.load_file import load_file
from flask import jsonify

from src.controllers.auth_controllers.song_auth_controller import auth_get, auth_get_id, auth_post, auth_post_song_, auth_put, auth_delete, auth_get_by_user
from src.utils.format_url import format_url

db = DatabaseConnection()

def validate(func) :#{
    def wrap(*args, **kwargs) :#{
        try :#{
            result, state = func(*args, **kwargs)
            return result, state
        #}
        except IntegrityError as err :#{
            print(err)
            print(type(err))
            msg = "This item is associated with other records; delete those records first to continue."
            return {'message' : msg}, 400 
        #}
        except DatabaseError as err :#{
            print(err)
            print(type(err))
            return {'message' : 'There are probles whit Data Base, try later'}, 500 
        #}
        except Exception as err:#{
            print(err)
            print(type(err))
            import traceback
            traceback.print_exc()
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

        count_sng, status = count("%", conn = conn)
        if status != 200 : return count_sng, status

        if (extended and (res := extend(songs, conn))[1] == 200) : return {'data' : res[0], 'count' : count_sng.get('count')}, 200;
        return {'data' : songs, 'count' : count_sng.get('count')}, 200
    #}
#}
    
@validate
def get_id(id, conn, extended = False,) :#{
    if not id : return {'message' : "song id not provided"}, 400

    with conn.cursor() as cur :#{
        cur.execute("""
            select id, name, description, url, goal, image, user_id from song where id = %s
        """, [id])

        row = cur.fetchone()
        # TODO verify in all controllers if <row> is None, 
        # TODO review what happend when <>cur.fetchone()</> is before that <>cur.rowcount</> or the opposite
        if not row or cur.rowcount == 0 : return {'message' : 'data not found'}, 404
        
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

        if (extended and (res := extend([song], conn))[1] == 200) : return  jsonify(res[0][0]), res[1];
        return song, 200
    #}
#}

# ====================================================================================================

@validate
def post(name : str, description : str, url : str, goal : str, user_id : str, genders, senses, singers, languages, playlists, music_file, image_file, available : bool = 1, ) :#{
    if(not (f_url := format_url(url)) and not (l_url := load_file(music_file))) : return {'message' : "url or file is invalid"}, 400
    else : url = f_url or l_url or None

    singers = singers or ['unknown']
    languages = languages or ['unknown']
    genders = genders or ['unknown']
    if (not name or not url or not user_id):#{
        return {'message' : "Insuficient data"}, 400
    #}
    if (AUTH_ERROR := auth_post(user_id)) : return AUTH_ERROR
    
    image = load_file(image_file, 'song_image') or ''
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
        id = uuid4().hex
        cur.execute("""insert into song(id, name, description, url, goal, image, user_id, available) 
                    values( %s, %s, %s, %s, %s, %s, %s, %s )""", (id, name, description, url, goal, image, user_id, available,));

        post_song_(genders, id, 'gender', user_id, conn)
        post_song_(playlists, id, 'playlist', user_id, conn)
        post_song_(singers, id, 'singer', user_id, conn)
        post_song_(languages, id, 'language', user_id, conn)
        post_song_senses(senses, id, user_id, conn = conn)

        conn.commit()
        return {'message' : "song registered", 'id' : id}, 200
    #}
#}

# @validate # INFO if validate is disabled this function cut all operation(POST/PUT)
def post_song_(entity : list[str], song_id : str, entity_name : str, user_id : str, conn) :#{
    # TODO verify if already exist repeating rows with same data
    with conn.cursor() as cur :#{
        for item in entity :#{
            auth_post_song_(user_id = user_id, entity_id = item, entity_name = entity_name, conn = conn)
            cur.execute(f"insert into song_{entity_name}(song_id, {entity_name}_id) values('{song_id}', '{item}')"); # TODO validate query doesn't reach exception
        #}
    #}
#}

def post_song_senses(senses : list, song_id : str, user_id, conn = None) :#{
    with conn.cursor() as cur :#{
        for sense in senses :#{
            score = {
                'min' : sense.get('score', {}).get('min', 0),
                'max' : sense.get('score', {}).get('max', 0),
            }
            query = f"insert into song_sense(song_id, sense_id, goal, user_id) values(%s, %s, %s, %s)"
            cur.execute(query, (song_id, sense.get('id', ''), float(score['max']), user_id))
        #}
    #}
#}

@validate
def put(song_id : str, name : str, description : str, url : str, goal : str, user_id : str, genders, senses, singers, languages, playlists, music_file, image_file,  available : bool = 1) :#{
    # TODO receive arguments way optional to not update all values if not necessary and doing update less demanding (List = [] o None)
    # TODO get song data to verify what is going to be updated and what not and verify if is convenient to update or not with optional arguments
    singers = singers if singers and len(singers) > 0  else ['unknown']
    languages = languages if languages and len(languages) > 0  else ['unknown']
    genders = genders or ['unknown']
    # if (not name or not user_id):#{
    #     return {'message' : "Insuficient data"}, 400
    # #}
    
    if not song_id : return {'message' : "song id not provided"}, 400
    if((rsrc := url or music_file) and not (f_url := format_url(url)) and not (l_url := load_file(music_file))) : return {'message' : "url or file is invalid"}, 400
    else : url = f_url or l_url if rsrc else None # else : url = f_url or l_url or None if rsrc else None

    if (AUTH_ERROR := auth_put(user_id)) : return AUTH_ERROR
    
    # BUG: -> image must save in user folder
    image = load_file(image_file) or ''
    keys : dict = {
        'name': name,
        'description': description,
        'url': url,
        'goal': goal,
        'image': image,
        'available': available,
        # 'id' : song_id,
    }
    keys : dict = { k : v for k, v in keys.items() if v} # if not image : del keys['image'] #keys.pop(3)

    kstring = [ f" {k} = %({k})s" for k in keys.keys()]
    with db.get_connection() as conn, conn.cursor() as cur :#{
        # cur.execute("begin;")
        cur.execute(f"""update song set {" , ".join(kstring)} 
                    where id = %(id)s;""", {**keys, 'id' : song_id})

        # DELETING BEFORE DATA
        for i in ['gender', 'playlist', 'singer', 'language', 'sense']:
            delete_song_(song_id, i, user_id, conn)

        # INSERTING NEW DATA
        post_song_(genders, song_id, 'gender', user_id, conn)
        post_song_(playlists, song_id, 'playlist', user_id, conn)
        post_song_(singers, song_id, 'singer', user_id, conn)
        post_song_(languages, song_id, 'language', user_id, conn)
        post_song_senses(senses, song_id, user_id, conn = conn)

        conn.commit()
        return {"message" : "song update successfully"}, 200
    #}
    # TODO update {genders=}  {senses=} {singers=} {languages=} {playlists=} of a song
#}

#NOTE this function doesn't validate user permmission, it must validate before
def delete_song_(song_id : str, entity_name : str, user_id : str, conn) :#{
    with conn.cursor() as cur :#{
        # TODO validate query doesn't reach exception
        q = f"delete from song_{entity_name} where song_id = %s"
        cur.execute(q, [song_id])
        conn.commit()
    #}
#}

@validate
def delete(song_id : str) :#{
    if not song_id : return {'message' : "song id not provided"}, 400
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
        song_data, status = get_id(song_id, conn)
    
        if status != 200 : return song_data, status
        if (AUTH_ERROR := auth_delete(song_data.get('user_id'))) : return AUTH_ERROR
        
        for i in ['gender', 'playlist', 'singer', 'language', 'sense']:
            delete_song_(song_id, i, song_data.get('user_id'), conn)
            
        cur.execute(f"delete from song where id = %s", [song_id])
        if(cur.rowcount == 0) : return {'message' : 'error, data not found'} , 404
        r1 = cur.fetchone()
        print(f"{r1=}")
        conn.commit()
        
        return {'message' : "song deleted successesfully"}, 200;
    #}
#}

# ====================================================================================================

@validate
def search(pattern : str, page : str = '1', limit : str = '10', extended = 0) :#{
    if not pattern : return {'message' : "pattern not provided"}, 400;
    user_id = ''
    
    page, limit, msg = format_pagination_parameters(page, limit)
    if (not page or not limit) : return {'message' : msg}, 400;
    offset = (page - 1) * limit

    from src.controllers.auth import whoami
    data, st = whoami()
    if (st != 200) : return {'message' : "forbidden"}, 403;
    user_id = data['id']
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
        cur.execute(f"""
                    select id, name, description, url, goal, image, user_id from song 
                    where user_id = %s and name like(%s) {"limit %s offset %s" if limit != -1 else ''}
                    """, [user_id, f"%{pattern}%", limit, offset][0:None if limit != -1 else 2])
        rows = cur.fetchall()
        if not rows or cur.rowcount == 0 : return {'message' : "data not found"}, 404
        songs = []
        for row in rows :#{
            songs.append({
                'id' : row[0],
                'name' : row[1],
                'description' : row[2],
                'url' : row[3],
                'goal' : float( row[4]),
                'image' : row[5],
                'user_id' : row[6],
            })
        #}
        
        if(AUTH_ERROR := auth_get_id(songs[0]['user_id'])): return AUTH_ERROR

        count_srch, st = count_search(pattern, user_id, conn)
        if st != 200 : return count_srch, st
        
        if (extended and (res := extend(songs, conn))[1] == 200) : return {'data' : res[0], 'count' : count_srch.get('count')}, res[1];
        
        return {'data' : songs, 'count' : count_srch.get('count')}, 200;
    #}
#}

def count_search(pattern : str, user_id : str, conn) :#{
    with conn.cursor() as cur :#{
        cur.execute("select count(*) from song where user_id = %s and name like(%s)", [user_id, f"%{pattern}%"])
        row = cur.fetchone()
        count = row[0]
        return {'count' : count}, 200
    #}
#}


def extend(songs : list, conn) -> list :#{ # it returns same songs list with extended data

    with conn.cursor() as cur :#{
        for song in songs :#{
            keys_cols : dict = { k : [f"{k}_id"] for k in ['gender','language','sense','singer', 'playlist'] }
            keys_cols['sense'] = ['sense_id', 'goal', 'user_id']
            
            dic_list : dict = { k : [] for k in keys_cols.keys() }

            for k in keys_cols.keys() :#{
                cur.execute(f"select {','.join(keys_cols[k])} from song_{k} where song_id = " + "%s", [ song['id']]) # cur.execute(f"select {k}_id from song_{k} where song_id = " + "%s", [ song['id']])
                rows = cur.fetchall()
                if(cur.rowcount == 0) : continue
                for row in rows :#{
                    cols = keys_cols[k]
                    res, status = [], 500
                    ctrl = GenericController(k)
                    res, status = ctrl.get_id_with_conn(row[0], conn)
                    zip_dict = dict(zip(cols, row))
                    if status == 200 : dic_list[k].append({**res, **zip_dict})
                #}
            #}

            # song |= dic_list 
            song.update({f"{k2}s": dic_list[k2]  for k2 in keys_cols.keys()})
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
        
        count_sng, status = count(user_id, conn = conn)
        if status != 200 : return count_sng, status

        if (extended and (res := extend(songs, conn))[1] == 200) : return {'data' : res[0], 'count' : count_sng.get('count')}, 200;
        return {'data' : songs, 'count' : count_sng.get('count')}, 200
    #}
#}

#TODO paginate endpoinst "get_by" and validate permmisions
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
def generate(genders : list[str], senses : list[str], singers : list[str], languages : list[str], goal : float, user_id : str, save = True ) :#{
    # TODO validate auth user is equal to user_id
    if(AUTH_ERROR := auth_get_id(user_id)): return AUTH_ERROR #Validate that the user is the same as the one who logged in. 
    
    if (not user_id): return {'message' : "Insuficient data"}, 400;
    if (not genders and not senses and not singers and not languages and not goal): return {'message' : "Insuficient data"}, 400;

    #BUG - it isn't protected of sql injection
    sense_str = ""
    for s in senses :#{
        sense_str += f"""
                (song_sense.sense_id = '{s.get('id', '')}' 
                and song_sense.goal <= {float(s.get('score', {}).get('max', 0))} 
                and song_sense.goal >= {float(s.get('score', {}).get('min', 0))}) or """
    #}
    sense_str += " 1=0 "
    
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
    {f"song_singer.singer_id in ({','.join([f"'{sg}'" for sg in singers])}) and" if singers else ''}
    {f"song_language.language_id in ({','.join([f"'{l}'" for l in languages])}) and" if languages else ''}
    { f"({sense_str}) and " if senses else '' }
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
        if save : save_generated_playlists(len(songs), generated_by, user_id, conn = conn)
        return songs, 200
    #}
#}

def save_generated_playlists(playlist_size : int, generated_by : dict, user_id : str, conn) :#{
    if (not generated_by or not user_id) : return None; # if (not pl or not generated_by or not user_id) : return None;

    try :#{
        json_data = dumps({
            'playlist_size' : playlist_size or -1,
            'generated_by' : generated_by,
            'user_id' : user_id,
        })

        dt = datetime.now()
        late = 5
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

def count(user_id : str, conn) :#{ #TODO change name to count_songs
    with conn.cursor() as cur :#{
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
