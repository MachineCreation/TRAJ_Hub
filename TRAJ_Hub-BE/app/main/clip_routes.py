from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from models import supabase_service, User

clip_bp = Blueprint('clip', __name__, template_folder="../../pages/html")

@clip_bp.route('/clip-upload', methods=['POST'])
@login_required
def uploadClips():
    username = current_user.id
    user_data = User.get(username)[0]
    data = request.form
    print(data)
    
    try:
        c1 = data.get('C1')
        c2 = data.get('C2')
        c3 = data.get('C3')
        c4 = data.get('C4')
        c5 = data.get('C5')
        c6 = data.get('C6')
        
        datalist = [c1, c2, c3, c4, c5, c6]
        
        for index, clip in enumerate(datalist, start=1):
            if clip != '':
                supabase_service.table("Loadouts").update({f"C{index}": clip}).eq("name", username).execute()
        
        return render_template("main.html", user_data=user_data)
    
    except Exception as e:
        return jsonify({"Error": f"{str(e)}"})
