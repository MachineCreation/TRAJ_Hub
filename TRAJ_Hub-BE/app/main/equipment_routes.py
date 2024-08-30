from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required, current_user
from models import supabase_service, User

equipment_bp = Blueprint('equipment', __name__, template_folder='../../pages/html')

@equipment_bp.route('/equipment-form', methods=['POST'])
@login_required
def equipmentUpload():
    
    username = current_user.id
    user_data = User.get(username)[0]
    data = request.form
    
    try:
        tactical = data.get('tactical')
        tacStats = data.get('tactical-stats') 
        lethal = data.get('lethal')
        letStats = data.get('lethal-stats')
        
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

        return render_template("main.html", user_data = user_data)
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500
    