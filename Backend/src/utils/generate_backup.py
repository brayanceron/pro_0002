from werkzeug.datastructures.file_storage import FileStorage
from src.db.database import DatabaseConnection
import json
from uuid import uuid4
from  src.controllers.GenericController import GenericController


generic_table = ['id', 'name', 'description', 'user_id', 'score', 'image', 'available']
song_table = ['id', 'name', 'description', 'url', 'goal', 'image', 'user_id', 'available']

tables_dict : dict = {
    # 'band' : generic_table,
    'gender' : generic_table,
    'language' : generic_table,
    'playlist' : generic_table,
    'sense' : generic_table,
    'singer' : generic_table,
    #'singer_band' : ['singer_id', 'band_id'],
}

song_tables = {
    'song' :song_table,
    'song_band' : ['song_id', 'band_id'],
    'song_gender' : ['song_id', 'gender_id'],
    'song_language' : ['song_id', 'languege_id'],
    'song_playlist' : ['song_id', 'playlist_id'],
    'song_sense' : ['song_id', 'sense_id', 'goal', 'user_id'],
    'song_singer' : ['song_id', 'singer_id'],
}
db = DatabaseConnection()


def generic_backup(user_id : str) -> dict :#{
    tabs = ['gender', 'language', 'playlist', 'sense', 'singer']
    total = {}
    for t in tabs:#{
        ctl = GenericController(t)
        result, status = ctl.get_by_user(user_id)
        if status == 404 : continue;
        if status != 200  and status != 404: raise Exception("Error generating backup");

        result = [{k : str(i[k]) for k in i.keys()} for i in result]
        total[t] = result
    #}
    return total  # return json.dumps(tota, indent=3)
#}

def song_backup(user_id : str) -> dict :#{
    # file_string = ""
    songs_str : list = []
    
    with db.get_connection() as conn, conn.cursor() as cur :#{
        q = """
            select id, name, description, url, song.goal, image, song.user_id, available
            from song where song.user_id=%s
        """

        cur.execute(q, [user_id])
        rows = cur.fetchall()

        for row in rows :#{
            songs_str.append({
                'id' : row[0],
                'name' : row[1],
                'description' : row[2],
                'url' : row[3],
                'goal' : str(row[4]),
                'image' : row[5],
                'user_id' : row[6],
                'available' : row[7],
            });
            
        #}
        
        others_tables : dict = {}

        for song in songs_str:#{
            cur.execute(f"""
                select 'song_gender'    as table_name, song_id, gender_id   from song_gender    where song_id = '{song['id']}' UNION
                select 'song_language'  as table_name, song_id, language_id from song_language  where song_id = '{song['id']}' UNION
                select 'song_playlist'  as table_name, song_id, playlist_id from song_playlist  where song_id = '{song['id']}' UNION
                select 'song_singer'    as table_name, song_id, singer_id   from song_singer    where song_id = '{song['id']}'
                order by table_name;
            """)
                # select 'song_sense'     as table_name, song_id, sense_id    from song_sense     where song_id = '{song['id']}' UNION
            rws = cur.fetchall();

            for rw in rws:#{
                name_key = str(rw[0]).split('_')[1]+"_id"
                others_tables[rw[0]] = [*others_tables[rw[0]], {'song_id' :rw[1], name_key:rw[2]} ] if rw[0] in others_tables.keys() else [{'song_id' :rw[1], name_key:rw[2]}]
                # others_tables[rw[0]] = [*others_tables[rw[0]], [rw[1], rw[2]]] if rw[0] in others_tables.keys() else [[rw[1], rw[2]]]
                # new_item = {'song_id' :rw[1], name_key:rw[2]}
            #}

            # table song_sense
            cur.execute(f"select song_id, sense_id, goal, user_id from song_sense where song_id = '{song['id']}'")
            rws_senses = cur.fetchall()
            for rw_s in rws_senses:#{
                new_item = {'song_id' : rw_s[0], 'sense_id' : rw_s[1], 'goal': str(rw_s[2]), 'user_id' : rw_s[3]}
                others_tables['song_sense'] = [*others_tables['song_sense'], new_item] if 'song_sense' in others_tables.keys() else [new_item]
            #}
        #}

        return {
            "song" : songs_str,
            **others_tables
        }
    #}
#}

def generate_json_backup(user_id : str) -> tuple[str, int] :#{
    try :#{
        generic_bk = generic_backup(user_id)
        song_bk = song_backup(user_id)
        json_backup = {**generic_bk, **song_bk} # json_backup = {**generic_backup(user_id), **song_backup(user_id)}

        # json_backup = change_ids(json_backup)
        return json.dumps(json_backup, indent = 3), 200;
    #}
    except Exception as err :#{
        print(err)
        return  str(err), 400
    #}
#}

# ==================| LOAD BACKUP |==================

def load_json_backup(json_dic : dict, user_id : str) :#{
    try :#{
        json_dic = change_ids(json_dic)
        tables = json_dic.keys()
        with db.get_connection() as conn, conn.cursor() as cur :#{

            for name_table in tables :#{
                qs = ""
                rows = json_dic[name_table]
                
                for row in rows :#{
                    name_cols = row.keys()
                    # qs += f"insert into {name_table}({','.join(name_cols)}) values({','.join([ f'%({k})s' for k in name_cols])});"
                    # qs += f"insert into {name_table}({','.join(name_cols)}) values({','.join( [ f"'{uuid4().hex if c == 'id' else user_id if c == 'user_id' else row[c]}'" for c in name_cols] )});"

                    # =================
                    # qs = f"insert into {name_table}({','.join(name_cols)}) values({','.join( [ f"'{row[c] if c != 'user_id' else user_id}'" for c in name_cols] )});"
                    qs = f"insert into {name_table}({','.join(name_cols)}) values({','.join( [ f"%({c})s" for c in name_cols] )});"
                    print(f"{qs=}")
                    cur.execute(qs, {k : row[k] if k != 'user_id' else user_id for k in name_cols });
                #}
                # cur.execute(qs);
            #}
            conn.commit()
            return {'message' : "Loaded data successfully"}, 200 # return {"qs":qs}
        #}
    #}
    except Exception as err:#{
        print(err)
        return {"message" : f"Some went bad. {err}"}, 500
    #}
#}

def change_ids(json_dic : dict) :#{
    tbs = ['gender', 'language','playlist','sense','singer','song']  # tbs = ['gender', 'language','playlist','sense','singer']
    tbs_sec = [ f"song_{i}" for i in tbs if i != 'song']

    # json_dic[t]=[ {**row, 'new_id' : uuid4().hex} for row in json_dic[t]]
    for t in tbs :#{
        # rows = json_dic[t]
        rows = json_dic.get(t)
        if not rows : continue

        for i,r in enumerate(rows) :#{
            newId = uuid4().hex
            oldId = r['id']
            
            json_dic[t][i]['id'] = newId  # json_dic[t][i]['new_id'] = newId

            if (t != "song") :#{
                st = f'song_{t}'
                # sub_rows = json_dic[st]
                sub_rows = json_dic.get(st)
                if not sub_rows : continue

                for j, sr in enumerate(sub_rows) :#{
                    # if(sr[f"{t}_id"] == oldId) : json_dic[st][j][f'new_{t}_id'] = newId
                    if(sr[f"{t}_id"] == oldId) : json_dic[st][j][f'{t}_id'] = newId
                #}
            #}
            else :#{
                for st in tbs_sec:#{
                    # sub_rows = json_dic[st]
                    sub_rows = json_dic.get(st)
                    if not sub_rows : continue

                    for k, sr in enumerate(sub_rows):#{
                        # if(sr["song_id"] == oldId) : json_dic[st][k]['new_song_id'] = newId
                        if(sr["song_id"] == oldId) : json_dic[st][k]['song_id'] = newId
                    #}
                #}
            #}
        #}
    #}

    # ============================
    # for t in tbs :#{
    #     json_dic[t]=[ {**row, 'new_id' : uuid4().hex} for row in json_dic[t]]
    # #}

    # for t in tbs :#{
    #     json_dic[f"song_{t}"] = [{**row, f'new_{t}_id' : nw['new_id'] if (nw := next(filter(lambda x : x['id'] == row[f"{t}_id"], json_dic[t]), None)) else row[f"{t}_id"] } for row in json_dic[f"song_{t}"] ]
    # #}

    return json_dic
#}

def read_backup_file(file : FileStorage) -> dict | None :#{
    try :#{
        mimetype = file.mimetype
        if (not "json" in mimetype) : return None;

        content = file.stream
        text_bytes = content.read()
        text = text_bytes.decode(errors = 'replace') # text = str(text_bytes,errors='replace')

        json_str = dict(json.loads(text))
        return json_str
    #}
    except Exception as err :#{
        print(err)
        return None
    #}
#}



# def generic_backup_(user_id : str):#{
#     file_string = ""
#     tables = tables_dict.keys()
#     with db.get_connection() as conn, conn.cursor() as cur :#{
#         for table in tables :#{
#             file_string += f">>>table:{table}\n"
#             # q = f"select {",".join(tables_dict[table])} from {table} where user_id = {user_id}"
#             # q = f"select {",".join(tables_dict[table])} from %s where user_id = %s"
#             q = f"select {",".join(tables_dict[table])} from {table} where user_id = %s"
#             # print(q)
#             cur.execute(q, [user_id])
#             rows = cur.fetchall()
#             for row in rows:#{
#                 # print(rows)
#                 # file_string += f"{','.join(row)}\n"
#                 file_string += f"{','.join([str(i) for i in row])}\n"
#             #}
#         #}
#         # File
#         # with open(f'backup.csv', '')
#         return file_string;
#     #}
# #}

# def song_backup2(user_id : str) -> str :#{
#     file_string = ""

#     songs_str = ""
#     # song_band = ""
#     song_gender_str = ""
#     song_language_str = ""
#     song_playlist_str = ""
#     song_sense_str = ""
#     song_singer_str = ""
    
#     with db.get_connection() as conn, conn.cursor() as cur :#{
#         q = """
#             select id, name, description, url, song.goal, image, song.user_id, available,
#             gender_id, language_id, playlist_id, sense_id, singer_id
#             from
#             song join song_gender on song.id = song_gender.song_id
#             join song_language on song.id = song_language.song_id
#             join song_playlist on song.id = song_playlist.song_id
#             join song_sense on song.id = song_sense.song_id
#             join song_singer on song.id = song_singer.song_id

#             where song.user_id=%s
#         """


#         cur.execute(q, [user_id])
#         rows = cur.fetchall()
#         print(len(rows))
#         # print(row)

#         for row in rows :#{
#             songs_str += f"{','.join([str(r) for r in row[0:7]])}\n"
#             # song_gender_str += f"{','.join([row[0], row[8]])}\n"
#             song_gender_str += f"{row[0]},{row[8]}\n"
#             song_language_str += f"{row[0]},{row[9]}\n"
#             song_playlist_str += f"{row[0]},{row[10]}\n"
#             song_sense_str += f"{row[0]},{row[11]}\n"
#             song_singer_str += f"{row[0]},{row[12]}\n"
#         #}

#         sep = ">>>table:\n"
#         # file_string = f"""{songs_str}"""
#         file_string = sep+songs_str+sep+\
#             song_gender_str+sep+\
#             song_language_str+sep+\
#             song_playlist_str+sep+\
#             song_sense_str+sep+\
#             song_singer_str

#         return file_string
#     #}
# #}