from flask import Blueprint, request
import src.controllers.song
import src.controllers.auth

keys : list = ['name', 'description', 'url', 'goal', 'user_id', 'available', 'duration' ]
ext_keys : list = ['genders', 'senses', 'singers', 'languages', 'playlists']

song_router = Blueprint('song_blueprint', __name__)

@song_router.route('/')
def get() :#{
    page = request.args.get('page', 1)
    limit = request.args.get('limit', 10)
    return src.controllers.song.get(page, limit, request.args.get('extended', False))
#}

@song_router.route('/<id>')
def get_id(id) :#{
    return src.controllers.song.get_id(id, request.args.get('extended', False))
#}

@song_router.route('/', methods = ['POST'])
def post() :#{
    values = request.values # stream= request.stream

    form = dict(request.form)
    form = {k : form.get(k) for k in keys} # extract necesary keys
    form = {**form, **{k : values.getlist(k) for k in ext_keys}} # extract list keys
    form = {**form, **{k :  [v for v in (form.get(k) or []) if v] for k in ext_keys}} # format(delete empty values) list keys

    del form['duration']
    if form['available'] == None : del form['available']


    image_file = request.files.get('image')
    music_file = request.files.get('file')

    print(form)
    print(form)
    # return {'message' : "Deliver error"}, 400
    return src.controllers.song.post(**form, image_file = image_file, music_file = music_file)
#}

@song_router.route('/<id>', methods = ['PUT'])
def put(id : str) :#{
    values = request.values # stream= request.stream

    form = dict(request.form)
    form = {k : form.get(k) for k in keys} # extract necesary keys
    form = {**form, **{k : values.getlist(k) for k in ext_keys}} # extract list keys
    form = {**form, **{k :  [v for v in (form.get(k) or []) if v] for k in ext_keys}} # format(delete empty values) list keys

    del form['url']
    del form['duration']
    if form['available'] == None : del form['available']

    image_file = request.files.get('image')

    # print(form)
    result = src.controllers.song.put(id, **form, image_file = image_file)
    print(f"{result=}")
    return result
    # return src.controllers.song.put(id, **form, image_file = image_file)
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
    ks = ['genders', 'senses', 'singers', 'languages']
    form = dict(request.get_json())
    form = {k : form.get(k, [] if k in ks else 0 ) for k in ['goal', 'user_id', *ks]} # extract necesary keys
    # print(form)
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
