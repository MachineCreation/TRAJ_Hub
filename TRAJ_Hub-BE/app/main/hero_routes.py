from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from models import supabase_service, User
import os
from PIL import Image

hero_bp = Blueprint('hero', __name__, template_folder='../../pages/html')

@hero_bp.route('/hero-image-upload', methods=['POST'])                          # route to upload hero image to supabase
@login_required
def upload_hero_image():
    if 'hero' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['hero']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        username = current_user.id
        filename = secure_filename(f"{username}_hero_image")
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

        try:
            supabase_service.storage.from_("user_profile_photos").remove([filename])
        except:
            print(f"Error removing existing file: {str(Exception)}")

        # Save the file temporarily
        file.save(file_path)

        try:
            with Image.open(file_path) as img:
                width, height = img.size
                
                crop_box = (
                    int(0.33 * width),  # left
                    int(0.03 * height), # top
                    int(0.61 * width),  # right
                    int(height)  # bottom
                )

                img.crop(crop_box).save(file_path, format=img.format)
            
            # Upload to Supabase
            with open(file_path, "rb") as f:
                supabase_service.storage.from_("user_profile_photos").upload(filename, f, {"content-type": "image/png"})
        finally:
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                except PermissionError:
                    print(f"PermissionError: Couldn't remove file {file_path} as it is being used by another process.")


        return jsonify({}), 200


    return jsonify({'error': 'Invalid file'}), 400

@hero_bp.route('/hero-url', methods=['POST'])
@login_required
def reroute_hero_url():
    username = current_user.id

    public_url = supabase_service.storage.from_("user_profile_photos").get_public_url(f"{username}_hero_image")

    if public_url:
        response = supabase_service.table("Loadouts").update({
            "hero_image_url": public_url
        }).eq("name",username).execute()

        if response.data:
            return jsonify({}), 200
        else:
            error_message = response.error.message if response.error else "unknown error"
            return jsonify({"error": error_message}), 500

    return jsonify({'error': 'invalid request'}), 400
