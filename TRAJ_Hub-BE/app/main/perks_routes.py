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
        p1_stats = data.get('perks1-stats')
        perks2 = data.get('perks2')
        p2_stats = data.get('perks2-stats')
        perks3 = data.get('perks3')
        p3_stats = data.get('perks3-stats')
        perks4 = data.get('perks4')
        p4_stats = data.get('perks4-stats')
        
        if perks1 and p1_stats:
            response = supabase_service.table("Loadouts").update({
                "perk1": {
                    "name": perks1,
                    "stats": p1_stats
                }
                }).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks1 data"
                return jsonify({"Error": error_message})
            
        if perks2 and p2_stats:
            response = supabase_service.table("Loadouts").update({
                "perk2": {
                    "name": perks2,
                    "stats": p2_stats
                }
                }).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks2 data"
                return jsonify({"Error": error_message})
            
        if perks3 and p3_stats:
            response = supabase_service.table("Loadouts").update({
                "perk3": {
                    "name": perks3,
                    "stats": p3_stats
                }
                }).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks3 data"
                return jsonify({"Error": error_message})
            
        if perks4 and p4_stats:
            response = supabase_service.table("Loadouts").update({
                "perk4": {
                    "name": perks4,
                    "stats": p4_stats
                }
                }).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks4 data"
                return jsonify({"Error": error_message})

        return jsonify({"message": "data upload successful"})
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500
    