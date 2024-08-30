from flask import Blueprint, render_template, jsonify, request, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from models import supabase_service, User
import os
from PIL import Image
import json

weapon_bp = Blueprint('weapon', __name__, template_folder='../../pages/html')

@weapon_bp.route('/weapon-upload', methods=['POST'])
@login_required
def upload_weapon():
    if 'primary' in request.files:
        slot = 'primary'
        attachment = 'PA'
    elif 'secondary' in request.files:
        slot = 'secondary'
        attachment = 'SA'
    else:
        return jsonify({'Error': "Expected element ID's not found"}), 400
    
    username = current_user.id
    user_data = User.get(username)[0]
    file = request.files.get(f'{slot}')
    
    if file:
        filename = secure_filename(f"{username}_{slot}_image")
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

        try:
            supabase_service.storage.from_("user_weapon_photos").remove([filename])
        except Exception as e:
            print(f"Error removing existing file: {str(e)}")

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
        
        data = request.form
        weapon = f'{slot}-weapon'
        weapon_stats = f'{slot}-weapon-stats'
        attachment_list = {}
        
        for att in range(1, 6):
            att_name = f'{attachment}{att}'
            att_stats_name = f'{att_name}-stats'
            
            if att_name in data and data[att_name]:
                attachment_list[data[att_name]] = json.loads(data.get(att_stats_name, '{}'))

        try:
            response = supabase_service.table("Loadouts").update({
                weapon: {
                    data[weapon]: {
                        "stats": json.loads(data[weapon_stats]),  # Ensure the stats are stored as JSON
                        "attachments": attachment_list
                    }
                }
            }).eq("name", username).execute()
            
            if not response.data:
                print(f"No response was received")
                return jsonify({'error': 'no response'}), 500
        except Exception as e:
            print(f"Error occurred: {str(e)}")
            return jsonify({'error': 'unknown', 'details': str(e)}), 500
    
        try:
            public_url = supabase_service.storage.from_("user_weapon_photos").get_public_url(f"{username}_{slot}_image")
            
            if public_url:
                response = supabase_service.table("Loadouts").update({
                    f"{slot}_image_url": public_url
                }).eq("name", username).execute()
            
            if response.data:
                return render_template('main.html', user_data = user_data)
            else:
                print(f"No response was received")
                return jsonify({'error': 'no response'}), 500
            
        except Exception as e:
            print(f"Error occurred: {str(e)}")
            return jsonify({'error': 'unknown', 'details': str(e)}), 500
            
    else:
        return jsonify({'error': 'Invalid file'}), 400
