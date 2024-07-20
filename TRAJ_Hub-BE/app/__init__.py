from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_login import LoginManager
from models import User, supabase, supabase_service
import os

login_manager = LoginManager()

def create_app():
    app = Flask(__name__, template_folder='../pages/html', static_folder='../static')
    app.secret_key = os.getenv('SECRET_KEY')
    CORS(app)

    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    from .auth.routes import auth_bp
    from .main.routes import main_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)

    @app.route('/test-css')
    def test_css():
        return send_from_directory('static/css', 'main.css')

    return app

@login_manager.user_loader
def load_user(username):
    user, _ = User.get(username)
    return user
