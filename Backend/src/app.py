from flask import Flask, request, Response
from src.utils.generate_backup import generate_json_backup, load_json_backup
from src.routes.api.song import song_router
from src.routes.api.user import user_router
from src.routes.api.auth import auth_router

from src.routes.api.generic_router import Generic_router

from flask_cors import CORS

app = Flask(__name__)

CORS(app, supports_credentials = True)
@app.before_request
def cors() :#{
    if request.method == "OPTIONS":
        return "", 200
#}


app.register_blueprint( Generic_router('gender').router,   url_prefix = '/api/gender')
app.register_blueprint( Generic_router('language').router, url_prefix = '/api/language')
app.register_blueprint( Generic_router('playlist').router, url_prefix = '/api/playlist')
app.register_blueprint( Generic_router('sense').router,    url_prefix = '/api/sense')
app.register_blueprint( Generic_router('singer').router,   url_prefix = '/api/singer')

app.register_blueprint(song_router, url_prefix = '/api/song')
app.register_blueprint(user_router, url_prefix = '/api/user')
app.register_blueprint(auth_router, url_prefix = '/api/auth')

# app.static_folder = "/store"
# app.static_folder = "../store"
app.static_folder = "D:\\DEV\\PROJECTS\\pro_0002\\Backend\\store"

#secret key
app.secret_key = "shhh"
