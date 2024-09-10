import os
import json

from dotenv import load_dotenv

load_dotenv()

FLASK_APP = os.getenv('FLASK_APP')
FLASK_ENV = os.getenv('FLASK_ENV')
SECRET_KEY = os.environ.get('SECRET_KEY')
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
SQLALCHEMY_TRACK_NOTIFICAITONS = False
API_KEY = os.getenv('API_KEY')
