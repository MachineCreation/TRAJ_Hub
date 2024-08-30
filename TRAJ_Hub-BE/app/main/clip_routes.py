from flask import Blueprint, render_template, jsonify, request, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from models import supabase_service, User
import os
from PIL import Image
import json

clip_bp = Blueprint('Clip', __name__, template_folder="../../pages/html")

@clip_bp.route('/clip-upload', methods=['POST'])
@login_required
def uploadClips():
    username = current_user.id
    user_data = User.get(username)[0]
    data = request.form
    
    try:
        
        c1 = data.get('C1')
        c2 = data.get('C2')
        c3 = data.get('C3')
        c4 = data.get('C4')
        c5 = data.get('C5')
        
        datalist = [c1, c2, c3, c4, c5]
        
        for clip in datalist:
            if clip:
                supabase_service.table("Loadouts").update({f"{clip.name}": clip}).eq("name", username).execute()
        
        return render_template("main.html", user_data = user_data)
    
    except Exception as e:
        return jsonify({"Error": f"{str(e)}"})
        
        