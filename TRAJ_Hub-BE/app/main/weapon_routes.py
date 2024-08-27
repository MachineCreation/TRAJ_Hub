from flask import Blueprint, render_template, jsonify, request, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from models import supabase_service, User
import os
from PIL import Image


weapon_bp = Blueprint('weapon', __name__,template_folder='../../pages/html')

@weapon_bp.route('/weapon-image-upload', methods=['POST'])
@login_required
def upload_weapon_image():
    if 'primary' in request.files:
        slot = 'primary'
    elif 'secondary' in request.files:
        slot = 'secondary'
    else:
        return jsonify({'Error': "Expected element ID's not found"}), 400
    
    file = request.files[f'{slot}']
    if file:
        username = current_user.id
        filename = secure_filename(f"{username}_{slot}_image")
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
                    int(0 * width),  # left
                    int(0.02 * height), # top
                    int(width),  # right
                    int(height)  # bottom
                )

                img.crop(crop_box).save(file_path, format=img.format)
                
            with open(file_path, "rb") as f:
                supabase_service.storage.from_("user_weapon_photos").upload(filename, f, {"content-type": "image/png"})

        finally:
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                except PermissionError:
                    print(f"PermissionError: Couldn't remove file {file_path} as it is being used by another process.")
        
        for key, value in request.form.items():
            print(f"{key}: {value}")
            
        return jsonify({}), 200
    
    else:
        return jsonify({'error': 'Invalid file'}), 400
    