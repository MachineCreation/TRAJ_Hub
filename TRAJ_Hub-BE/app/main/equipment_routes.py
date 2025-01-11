from flask import Blueprint, jsonify, request
from models import supabase_service
from .proxy import api_post
from ..auth.auth_required import token_required

equipment_bp = Blueprint('equipment', __name__)

@equipment_bp.route('/equipment-form', methods=['POST'])
@token_required
def equipmentUpload():
    data = request.form
    
    try:
        tactical = data.get('tactical')
        lethal = data.get('lethal')
        username = data.get('uname')

        letStats = api_post(f'lethal/{lethal}').get_json()['description']
        tacStats = api_post(f'tactical/{tactical}').get_json()['description']
    
        result = {
            "user name": username,
            "tactical": {tactical: tacStats},
            "lethal": {lethal: letStats}
        }

        if tactical and tacStats:
            response = supabase_service.table("Loadouts").update({
                "tactical": {
                    "name": tactical,
                    "stats": tacStats
                }
                }).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading tactical data"
                return jsonify({"Error": error_message})
            
        if lethal and letStats:
            response = supabase_service.table("Loadouts").update({
                "lethal": {
                    "name": lethal,
                    "stats": letStats
                }
                }).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading tactical data"
                return jsonify({"Error": error_message})
        
        return jsonify({"error": "none", "details": result, 'ok': True})
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500
    