from flask import Blueprint, request
from src.db.database import DatabaseConnection
import src.controllers.song
import src.controllers.auth
import json
from src.helpers.HelperGenerateParams import GenerateParams

keys : list = ['name', 'description', 'url', 'goal', 'user_id', 'available', 'duration' ]
ext_keys : list = ['genders', 'senses', 'singers', 'languages', 'playlists']

db = DatabaseConnection()
song_router = Blueprint('song_blueprint', __name__)

@song_router.route('/')
def get() :#{
    page = request.args.get('page', 1)
    limit = request.args.get('limit', 10)
    return src.controllers.song.get(page, limit, request.args.get('extended', False))
#}

@song_router.route('/<id>')
def get_id(id) :#{
    #INFO it becouse this endpoint is used for others routes, so it exhausted pool
    with db.get_connection() as conn :#{
        return src.controllers.song.get_id(id, conn, request.args.get('extended', False))
    #}
#}

@song_router.route('/', methods = ['POST'])
def post() :#{
    values = request.values # stream= request.stream

    form = dict(request.form)
    form = {k : form.get(k) for k in keys} # extract necesary keys
    form = {**form, **{k : values.getlist(k) for k in ext_keys}} # extract list keys
    form = {**form, **{k :  [v for v in (form.get(k) or []) if v] for k in ext_keys}} # format(delete empty values) list keys
    form['senses'] = get_senses_from_str(form.get('senses', [''])[0])

    del form['duration']
    if form['available'] == None : del form['available']

    image_file = request.files.get('image')
    music_file = request.files.get('file')

    return src.controllers.song.post(**form, image_file = image_file, music_file = music_file)
#}

@song_router.route('/<id>', methods = ['PUT'])
def put(id : str) :#{
    values = request.values # stream= request.stream

    form = dict(request.form)
    form = {k : form.get(k) for k in keys} # extract necesary keys
    
    #TODO  validate if keys are empty("[]") or if was not provided(None), 
    #BUG it is a problem becouse it don't allow to leave empty lists("[]")
    form = {**form, **{k : values.getlist(k) for k in ext_keys}} # extract list keys
    form = {**form, **{k :  [v for v in (form.get(k) or []) if v] for k in ext_keys}} # format(delete empty values) list keys
    form['senses'] = get_senses_from_str(form.get('senses', [''])[0])

    del form['duration']
    if form['available'] == None : del form['available']

    image_file = request.files.get('image')
    music_file = request.files.get('file')
    return src.controllers.song.put(id, **form, image_file = image_file, music_file = music_file)
#}

#NOTE - this function is used only by post and put endpoints
def get_senses_from_str(senses_str : str) -> list :#{
    try : return [ {k : i.get(k, '') for k in ['id', 'name', 'score']} for i in json.loads(senses_str) ]
    except : return []
#}

@song_router.route('/<id>', methods = ['DELETE'])
def delete(id : str) :#{
    return src.controllers.song.delete(id)
#}

@song_router.route('/search/<pattern>')
def search(pattern : str) :#{
    extended = request.args.get('extended')
    page = request.args.get('page', 1)
    limit = request.args.get('limit', 10)
    return src.controllers.song.search(pattern, page, limit, extended)
#}

@song_router.route('/by/user/<user_id>')
def get_by_user(user_id) :#{
    page = request.args.get('page', 1)
    limit = request.args.get('limit', 10)
    return src.controllers.song.get_by_user(user_id, page, limit, request.args.get('extended', False))
#}

@song_router.route('/by/gender/<gender_id>')
def get_by_gender(gender_id) :#{
    return src.controllers.song.get_by_gender(gender_id)
#}

@song_router.route('/by/playlist/<playlist_id>')
def get_by_playlist(playlist_id) :#{
    return src.controllers.song.get_by_playlist(playlist_id)
#}

@song_router.route('/by/sense/<sense_id>')
def get_by_sense(sense_id) :#{
    return src.controllers.song.get_by_sense(sense_id)
#}

@song_router.route('/by/singer/<singer_id>')
def get_by_singer(singer_id) :#{
    return src.controllers.song.get_by_singer(singer_id)
#}

@song_router.route('/by/language/<language_id>')
def get_bay_language(language_id) :#{
    return src.controllers.song.get_by_language(language_id)
#}


@song_router.route('/generate', methods = ['POST'])
def generate() :#{
    ksa = ['genders', 'senses', 'singers', 'languages'] # keys that are arrays inside include/exclude
    ks = ('goal', 'user_id', 'include', 'exclude') # keys at request body
    form = dict(request.get_json()) #FIXME - error if it isn't json
    form = {k : form.get(k, {} if k in ks[2:] else 0) for k in ks}
    
    form['include'] = GenerateParams(**{k : form['include'].get(k, []) for k in ksa})
    form['exclude'] = GenerateParams(**{k : form['exclude'].get(k, []) for k in ksa})
    
    save = request.args.get('save', False) # save = save if (save := request.args.get('save', None)) else None  
    return src.controllers.song.generate(**form, save = save)
#}

@song_router.route('/get_generated_playlists/<user_id>')
def get_generated_playlists(user_id) :#{
    return src.controllers.song.get_generated_playlists(user_id)
#}

@song_router.before_request
def auth_middleware() :#{
    src.controllers.auth.auth_middleware()
#}

# @song_router.teardown_app_request
# def teardown_db(err) :#{
#     src.controllers.song.teardown_db()
# #}

# def conection(func) :#{
#         def wrap(*args, **kargs) :#{
#             conn = "IT IS CONNECTION"
#             return func(conn, *args, **kargs)
#             # func(*args, **kargs, conn)
#             # func(*[*args, conn], **kargs)
#             # return func(*[*args, conn], **{**kargs, 'conn' : conn})
#         #}
#         return wrap
#     #}
# #}