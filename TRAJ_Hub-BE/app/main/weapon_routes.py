from flask import Blueprint, jsonify, request, current_app
from werkzeug.utils import secure_filename
from .proxy import api_proxy
from models import supabase_service
import os
from PIL import Image

weapon_bp = Blueprint('weapon', __name__, template_folder='../../pages/html')

#------------------------------------------------------------ update weaopn data requires username, slot, weapon Type, weapon name and {attachment type: attachment, ...} in json body
@weapon_bp.route('/update-weapon-data', methods=["POST"])
def updateWeaponData():
    data = request.get_json()
    if data:
        try:
            uname = data.get('user')
            slot = data.get('slot')
            wtype= data.get('type')
            wname = data.get('name')
            attachments_raw = data.get('attachments')
            
            weapon = api_proxy(f'weapon/{wtype}/{wname}')
            weapon_stats = {}
            for stat, value in  weapon.get_json().get('stats').items():
                if not isinstance(value,dict):
                    weapon_stats[stat] = value
            attachments = {}
            
            for atype, att in attachments_raw.items():
                response = api_proxy(f'/attachment/{wtype}/{wname}/{atype.lower()}/{att}')
                stats = response.get_json()
                attachments[att] = stats.get('stats')
            weapon_object = {
                        wname : {
                            "attachments": attachments,
                            "stats": weapon_stats
                        }
                    }
            try:
                response = supabase_service.table("Loadouts").update({
                    f'{slot}-weapon': weapon_object
                }).eq("name", uname).execute()
                
                if not response.data:
                    print(f"No response was received")
                    return jsonify({'error': 'no response'}), 500
            except Exception as e:
                print(f"Error occurred: {str(e)}")
                return jsonify({'error': 'unknown', 'details': str(e)}), 500
            
            return jsonify({f'{uname} {slot} data updated': weapon_object}), 200    
        except Exception as e:
            print(f"Error occurred: {str(e)}")
            return jsonify({'error': 'unknown', 'details': str(e)}), 500


#-------------- update weapon image requires file, slot, and username in json body
def save_and_crop_image(image, file_path, crop_box):
    """
    Saves and crops an image to the specified dimensions.
    """
    # Save the file temporarily
    image.save(file_path)

    # Open the image file and perform cropping
    with Image.open(file_path) as img:
        width, height = img.size  # Get actual image dimensions
        crop_box_actual = (
            int(crop_box[0] * width),   # left
            int(crop_box[1] * height),  # top
            int(crop_box[2] * width),   # right
            int(crop_box[3] * height)   # bottom
        )
        img.crop(crop_box_actual).save(file_path, format=img.format)


def upload_to_supabase(bucket, filename, file_path):
    """
    Uploads a file to the specified Supabase storage bucket.
    """
    try:
        with open(file_path, "rb") as f:
            supabase_service.storage.from_(bucket).upload(filename, f, {"content-type": "image/png"})
        return supabase_service.storage.from_(bucket).get_public_url(filename)
    except Exception as e:
        raise RuntimeError(f"Error uploading to Supabase: {str(e)}")

@weapon_bp.route('/update-image', methods=["POST"])
def update_weapon_image():
    image = request.files.get('file')
    slot = request.form.get('slot')
    uname = request.form.get('uname')

    print(slot)

    if not image or not slot or not uname:
        return jsonify({'error': 'missing parameters'}), 400

    filename = secure_filename(f"{uname}_{slot}_image" if slot != "hero" else f"{uname}_hero_image")
    bucket = "user_weapon_photos" if slot != "hero" else "user_profile_photos"
    crop_box = (
        (0, 0.04, 1, 1) if slot != "hero" else
        (0.33, 0.03, 0.61, 1)
    )
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    try:
        supabase_service.storage.from_(bucket).remove([filename])
    except Exception as e:
        print(f"Error removing existing file: {str(e)}")

    try:
        save_and_crop_image(image, file_path, crop_box)
        public_url = upload_to_supabase(bucket, filename, file_path)

        column_name = f"{slot}_image_url" if slot != "hero" else "hero_image_url"
        response = supabase_service.table("Loadouts").update({column_name: public_url}).eq("name", uname).execute()

        if response.data:
            return jsonify({f'{slot} weapon image update': 'success'}), 200
        else:
            error_message = response.error.message if response.error else "unknown error"
            return jsonify({"error": error_message}), 500
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500
    finally:
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except PermissionError:
                print(f"PermissionError: Couldn't remove file {file_path} as it is being used by another process.")
