from flask import Blueprint, request, jsonify, render_template
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, supabase, supabase_service

auth_bp = Blueprint('auth', __name__, template_folder='../../pages/html')

@auth_bp.route('/')
def home():
    return render_template('sign-in.html')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('uname')
    password = data.get('psw')

    user, user_data = User.get(username)
    if user and (check_password_hash(user_data['password'], password) or user_data['password'] == password):
        login_user(user)
        if user_data['needs_password_update']:
            return jsonify({"status": "update_password", "message": "Please update your password."})
        return jsonify({"status": "success", "message": "Login successful."})
    return jsonify({"status": "fail", "message": "Invalid credentials."}), 401

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"status": "success", "message": "Logged out."})

@auth_bp.route('/update_password', methods=['POST'])
@login_required
def update_password():
    data = request.json
    username = current_user.id
    new_password = data.get('new_psw')

    hashed_password = generate_password_hash(new_password)
    response = supabase_service.from_('User').update({'password': hashed_password, 'needs_password_update': False}).eq('username', username).execute()
    if response.data:
        logout_user()  # Force re-authentication
        return jsonify({"status": "success", "message": "Password updated. Please log in again."})
    return jsonify({"status": "fail", "message": "User not found."}), 404
