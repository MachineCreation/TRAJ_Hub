from flask import Blueprint, jsonify, request
from ..auth.auth_required import token_required
from models import supabase_service


clip_bp = Blueprint('clip', __name__)

@clip_bp.route('/clip-upload', methods=['POST'])
@token_required
def upload_clips():
    """
    Flask route to generate pre-signed url for supabase storage and handle simple strings
    """
    form = request.form

    try:
        urls = {}
        for key, clip in form.items():
            supabase_service.storage.from_('member_clips').remove(clip)
            signed_url = supabase_service.storage.from_('member_clips').create_signed_upload_url(clip)
            signed_url['signed_url'] = signed_url.get('signed_url').replace('//', '/').replace('https:/', 'https://')
            print(signed_url)
            urls[key] = signed_url
        print(urls)
        return jsonify({'urls': urls}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': f'{str(e)}'}), 500
            
        
@clip_bp.route('/update-clip-field', methods = ['POST'])
@token_required
def updateClipField():
    data = request.form
    username = data['uname']
        
    try: 
        for key, url in data.items():
            print(key, url)
            if key != 'uname':
                supabase_service.table('Loadouts').update({key: url}).eq("name", username).execute()
        return jsonify({'update': 'Success'}), 200
    except Exception as e:
        print({"Error": f"an exception was made while updating clip fields for {username}. {e}"})
        return jsonify({"Error": f"{str(e)}"}), 500
    
   
