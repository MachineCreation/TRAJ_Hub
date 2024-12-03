from flask import Blueprint, request, jsonify, render_template, current_app, make_response
# from flask_login import current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, supabase_service
import jwt
from datetime import datetime, timezone, timedelta
from .auth_required import token_required


auth_bp = Blueprint('auth', __name__, template_folder='../../pages/html')

@auth_bp.route('/')
def home():
    return render_template('sign-in.html')

#---------- login user -----------

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('uname')
    password = data.get('psw')

    user, user_data = User.get(username)
    if user and (check_password_hash(user_data['password'], password)):
        if user_data['needs_password_update']:
            return jsonify({"status": "update_password", "message": "Please update your password."})
        
        timezone_offset = -8.0
        tzone = timezone(timedelta(hours=timezone_offset))
        
        token = jwt.encode({
            'sub': username,
            'iat': datetime.now(tzone),
            'exp': datetime.now(tzone) + timedelta(hours=36)
        },current_app.config['SECRET_KEY'], algorithm='HS256')
        
        response = make_response(jsonify({"status": "success", "message": "Login successful.","username": username}))
        response.set_cookie('token', token, httponly=True, secure=True, samesite='none')
        
        return response
    
    return jsonify({"status": "fail", "message": "Invalid credentials."}), 401


#---------check if user is authorized---------

@auth_bp.route('/auth/check', methods=['GET'])
def check_auth():
    token = request.cookies.get('token')
    if not token:
        return jsonify({'authenticated': False}), 200

    try:
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({'authenticated': True, "username": data['sub']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'authenticated': False, "username": ''}), 200
    except jwt.InvalidTokenError:
        return jsonify({'authenticated': False, "username": ''}), 200

# @auth_bp.route('/logout', methods=['POST'])
# @token_required
# def logout(current_user):
#     return jsonify({"status": "success", "message": "Logged out."})

# @auth_bp.route('/update_password', methods=['POST'])
# @token_required
# def update_password():
#     data = request.json
#     username = current_user.id
#     new_password = data.get('new_psw')

#     hashed_password = generate_password_hash(new_password)
#     response = supabase_service.from_('User').update({'password': hashed_password, 'needs_password_update': False}).eq('username', username).execute()
#     if response.data:
#         return jsonify({"status": "success", "message": "Password updated. Please log in again."})
#     return jsonify({"status": "fail", "message": "User not found."}), 404
