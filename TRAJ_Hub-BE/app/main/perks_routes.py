from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from models import supabase_service

perks_bp = Blueprint('perks', __name__, template_folder='../../pages/html')

@perks_bp.route('/perks-form', methods=['POST'])
@login_required
def perksUpload():
    username = current_user.id
    data = request.form
    
    try:
        perks1 = data.get('perks1')
        perks2 = data.get('perks2')
        perks3 = data.get('perks3')
        perks4 = data.get('perks4')
        if perks1:
            response = supabase_service.table("Loadouts").update({"perk1": perks1}).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks1 data"
                return jsonify({"Error": error_message})
            
        if perks2:
            response = supabase_service.table("Loadouts").update({"perk2": perks2}).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks2 data"
                return jsonify({"Error": error_message})
            
        if perks3:
            response = supabase_service.table("Loadouts").update({"perk3": perks3}).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks3 data"
                return jsonify({"Error": error_message})
            
        if perks4:
            response = supabase_service.table("Loadouts").update({"perk4": perks4}).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks4 data"
                return jsonify({"Error": error_message})

        return jsonify({"message": "data upload successful"})
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500
    