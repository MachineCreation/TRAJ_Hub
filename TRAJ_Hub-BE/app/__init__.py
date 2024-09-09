from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from models import User
from config import ORIGINS
import os

login_manager = LoginManager()

def create_app():
    app = Flask(__name__, template_folder='../pages/html', static_folder='../static')
    app.secret_key = os.getenv('SECRET_KEY')
    CORS(app, resources={r"/*": {"origins": ORIGINS}})

    UPLOAD_FOLDER = 'uploads/'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    from .auth.routes import auth_bp
    from .main.main_routes import main_bp
    from .main.hero_routes import hero_bp
    from .main.weapon_routes import weapon_bp
    from .main.equipment_routes import equipment_bp
    from .main.perks_routes import perks_bp
    from .main.clip_routes import clip_bp
    from .main.proxy import proxy_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(hero_bp)
    app.register_blueprint(weapon_bp)
    app.register_blueprint(equipment_bp)
    app.register_blueprint(perks_bp)
    app.register_blueprint(clip_bp)
    app.register_blueprint(proxy_bp)

    return app


@login_manager.user_loader
def load_user(username):
    user, _ = User.get(username)
    return user
