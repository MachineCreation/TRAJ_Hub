from flask import Flask
from flask_cors import CORS
import os
from config import ORIGINS

def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv('SECRET_KEY')
    
    
    CORS(app, resources={r"/*": {"origins": ORIGINS}}, supports_credentials=True)

    UPLOAD_FOLDER = 'uploads/'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    from .auth.routes import auth_bp
    from .main.main_routes import main_bp
    from .main.weapon_routes import weapon_bp
    from .main.equipment_routes import equipment_bp
    from .main.perks_routes import perks_bp
    from .main.clip_routes import clip_bp
    from .main.proxy import proxy_bp
    from .main.Game_routes import game_bp
    from .profile.email_contact_route import profileEmail_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(weapon_bp)
    app.register_blueprint(equipment_bp)
    app.register_blueprint(perks_bp)
    app.register_blueprint(clip_bp)
    app.register_blueprint(proxy_bp)
    app.register_blueprint(game_bp)
    app.register_blueprint(profileEmail_bp)

    return app

