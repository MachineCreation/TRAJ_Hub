from flask import Blueprint, render_template, jsonify, request, current_app
from flask_login import login_required, current_user
from models import User, supabase_service
from models import weapon_api_key
import requests
import json
import os

main_bp = Blueprint('main', __name__, template_folder='../../pages/html')

# Render home page Backend interface
@main_bp.route('/main')
@login_required
def main_page():
    user_data = User.get(current_user.id)[1]
    return render_template('main.html', user_data=user_data)

# fetch member data for frntend (public)
@main_bp.route('/get-member-profile', methods=['POST'])
def memberProfile():
    try:
        data = request.get_json()
        member = data.get('member')
        
        print(f"Received data: {data}")
        print(f"Member: {member}")

        if not member:
            return jsonify({'error': 'Member not provided'}), 400

        response = supabase_service.from_('Loadouts').select('*').eq("name", member).execute()
        if not response.data:
            return jsonify({'error': response.error.message}), 500

        
        processed_data = []
        for col in response.data:
            
            col['primary-weapon'] = json.loads(col['primary-weapon'])
            col['secondary-weapon'] = json.loads(col['secondary-weapon'])
            col['lethal'] = json.loads(col['lethal'])
            col['perk1'] = json.loads(col['perk1'])
            col['perk2'] = json.loads(col['perk2'])
            col['perk3'] = json.loads(col['perk3'])
            col['perk4'] = json.loads(col['perk4'])
            col['tactical'] = json.loads(col['tactical'])
            processed_data.append(col)

        return jsonify(processed_data), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500


# upload home page data
@main_bp.route('/main-page-upload', methods=['POST'])
@login_required
def main_page_upload():
    username = current_user.id
    user_data = User.get(username)[1]
    
    form_data = {
        "sq-p-name": request.form.get("sq-p-name"),
        "sq-s-name": request.form.get("sq-s-name"),
        "clip1": request.form.get("clip1"),
        "clip2": request.form.get("clip2"),
        "clip3": request.form.get("clip3"),
        "C6": request.form.get("C6"),
    }

    for key, value in form_data.items():
        if value:
            response = supabase_service.table('main').update({
                key: value
            }).eq("id", "home").execute()
            
            if not response.data:
                print(f"No response was received for {key}: {value}")

    if 'primary-image' in request.files and request.files['primary-image'].filename != '':
        primary_image = request.files['primary-image']
        primary_image_filename = 'Squad_primary.png'
        primary_image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], primary_image_filename)
        primary_image.save(primary_image_path)
        try:
            supabase_service.storage.from_("user_weapon_photos").remove([primary_image_filename])
        except Exception as e:
            print(f"Error removing existing file: {str(e)}")
                
        with open(primary_image_path, 'rb') as f:
            supabase_service.storage.from_('user_weapon_photos').upload(primary_image_filename, f, {"content-type": "image/png"})
        primary_image_url = supabase_service.storage.from_('user-weapon-photos').get_public_url(primary_image_filename)
        
        if primary_image_url:
                response = supabase_service.table("main").update({
                    "sq-primary": primary_image_url
                }).eq("id", "home").execute()
            
                if response.data:
                    return render_template('main.html', user_data=user_data)
                else:
                    print(f"No response was received")

    if 'secondary-image' in request.files and request.files['secondary-image'].filename != '':
        secondary_image = request.files['secondary-image']
        secondary_image_filename = 'Squad_secondary.png'
        secondary_image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], secondary_image_filename)
        secondary_image.save(secondary_image_path)
        try:
            supabase_service.storage.from_("user_weapon_photos").remove([secondary_image_filename])
        except Exception as e:
            print(f"Error removing existing file: {str(e)}")

        with open(secondary_image_path, 'rb') as f:
            supabase_service.storage.from_('user_weapon_photos').upload(secondary_image_filename, f, {"content-type": "image/png"})
        secondary_image_url = supabase_service.storage.from_('user-weapon-photos').get_public_url(secondary_image_filename)

        if secondary_image_url:
                response = supabase_service.table("main").update({
                    "sq-secondary": secondary_image_url
                }).eq("id", "home").execute()
            
                if response.data:
                    return render_template('main.html', user_data=user_data)
                else:
                    print(f"No response was received")

    return render_template('main.html', user_data=user_data)

@main_bp.route('/populate-home', methods=['POST'])
def get_home_page():
    
    try:
        response = supabase_service.from_('main').select('*').eq("id", "home").execute()
        if not response.data:
            return jsonify({'error': response.error.message}), 500
        
        processed_data = []
        for row in response.data:
            processed_data.append(row)
            
        return jsonify(processed_data), 200
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500
    
@main_bp.route('/weapon-data', methods=["POST"])
def get_weapon():
    try:
        data = request.get_json()
        name = data.get('name')
        type = data.get('type')
        
        if not name:
            print("no name found in data")
            
        if not type:
            print("no type found in data.")
            
        api_key = weapon_api_key
        if not api_key:
            return jsonify({"error": "API key is not configured"}), 500
        
        api_url = f"https://strippers.onrender.com/weapon/{type}/{name}"  
        headers = {"X-API-Key": f"{api_key}"}
        
        response = requests.get(api_url, headers=headers)

        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({"error": "Failed to fetch data from external API", "status_code": response.status_code}), response.status_code
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500