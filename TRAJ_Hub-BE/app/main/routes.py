from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from .. import users

main_bp = Blueprint('main', __name__, template_folder='../../pages/html')

@main_bp.route('/main')
@login_required
def main_page():
    user_data = users.get(current_user.id)["data"]
    return render_template('main.html', user_data=user_data)

@main_bp.route('/update_data', methods=['POST'])
@login_required
def update_data():
    data = request.json
    user_data = data.get('data')
    username = current_user.id

    user = users.get(username)
    if user:
        user['data'].update(user_data)
        return jsonify({"status": "success", "message": "Data updated."})
    return jsonify({"status": "fail", "message": "User not found."}), 404
