from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required, current_user
from models import supabase_service, User
from .proxy import api_post

perks_bp = Blueprint('perks', __name__, template_folder='../../pages/html')

@perks_bp.route('/update-perks', methods=['POST'])
def perksUpload():
    data = request.form
    
    try:
        username = data.get('username')
        perks1 = data.get('perk1')
        p1_stats = data.get('p1descrip')
        perks2 = data.get('perk2')
        p2_stats = data.get('p2descrip')
        perks3 = data.get('perk3')
        p3_stats = data.get('p3descrip')
        
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


        return jsonify({'Update': "successful"}), 200
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500

#-------------- update wildcard ------------------
#-------------------------------------------------
#-------------------------------------------------

    
@perks_bp.route('/update-wildcard', methods= ["POST"])
def updateWildcard():
    data = request.form
    try:
        username = data.get('username')
        wildcard = data.get('wildcard')
        wdescrip = data.get('wdescrip')
        
        if wildcard and wdescrip:
            response = supabase_service.table("Loadouts").update({
                "perk4": {
                    "name": wildcard,
                    "stats": wdescrip
                }
                }).eq("name", username).execute()
            if not response.data:
                error_message = response.error.message if response.error else "unknown error uploading perks3 data"
                return jsonify({"Error": error_message})
            
            return jsonify({'Update': "successful"}), 200
        return jsonify({
            'Error occured': "Request missing data",
            "request data": {
                "username": username,
                "wildcard name": wildcard,
                "wildcard description": wdescrip
                }
            }), 404
            
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500