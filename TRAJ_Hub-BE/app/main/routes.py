from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from models import supabase, User
import os


main_bp = Blueprint('main', __name__, template_folder='../../pages/html')

@main_bp.route('/main')
@login_required
def main_page():
    user_data = User.get(current_user.id)[1]
    return render_template('main.html', user_data=user_data)

@main_bp.route('/')
@login_required
def home():
    return render_template('upload.html')

@main_bp.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['file']
    file_extension = os.path.splitext(file.filename)[1]
    file_path = f"public/{file.filename}"

    # Upload to Supabase Storage
    response = supabase.storage().from_('your-bucket-name').upload(file_path, file)

    if response['status'] == 'success':
        # Save the file URL in the database
        file_url = f"{url}/storage/v1/object/public/your-bucket-name/{file_path}"
        # Store file_url in your database
        return jsonify({"url": file_url}), 200
    else:
        return jsonify({"error": response['message']}), 400
