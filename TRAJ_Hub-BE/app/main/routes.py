from flask import Blueprint, render_template, jsonify, request, current_app
from flask_login import login_required, current_user
from models import supabase, supabase_service, User
import os


main_bp = Blueprint('main', __name__, template_folder='../../pages/html')

@main_bp.route('/main')
@login_required
def main_page():
    user_data = User.get(current_user.id)[1]
    return render_template('main.html', user_data=user_data)

