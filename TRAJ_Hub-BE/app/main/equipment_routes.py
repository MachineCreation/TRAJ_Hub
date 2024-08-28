from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required, current_user
from models import supabase_service, User

equipment_bp = Blueprint('equipment', __name__, template_folder='../../pages/html')

@equipment_bp.route('/equipment-form', methods=['POST'])
@login_required
def equipmentUpload():
    username = current_user.id
    data = request.form
    
    print(data)
    try:
        tactical = data.get('tactical')   
        lethal = data.get('lethal')
        
        if tactical:
            response = supabase_service.table("Loadouts").update({"tactical": tactical}).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading tactical data"
                return jsonify({"Error": error_message})
            
        if lethal:
            response = supabase_service.table("Loadouts").update({"lethal": lethal}).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading tactical data"
                return jsonify({"Error": error_message})

        return jsonify({"message": "data upload successful"})
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500
    