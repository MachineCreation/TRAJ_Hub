from flask import Blueprint, render_template, jsonify, request, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from models import supabase_service, User
import os
from PIL import Image


weapon_bp = Blueprint('weapon', __name__,template_folder='../../pages/html')

@weapon_bp.route('/weapon_image_upload', methods=['POST'])
@login_required
def upload_weapon_image():
    if 'primary' in request.files:
        file = request.files['primary']
        if file:
            username = current_user.id
            filename = secure_filename(f"{username}_primary_image")
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

            try:
                supabase_service.storage.from_("user_weapon_photos").remove([filename])
            except:
                print(f"Error removing existing file: {str(Exception)}")

            file.save(file_path)

            try:
                with Image.open(file_path) as img:
                    width, height = img.size

                    crop_box = (
                        int(width),  # left
                        int(0.02 * height), # top
                        int(width),  # right
                        int(height)  # bottom
                    )

                    img.crop(crop_box).save(file_path, format=img.format)

            finally:
                if os.path.exists(file_path):
                    try:
                        os.remove(file_path)
                    except PermissionError:
                        print(f"PermissionError: Couldn't remove file {file_path} as it is being used by another process.")
            print(request.data)