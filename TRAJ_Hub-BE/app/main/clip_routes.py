from flask import Blueprint, jsonify, request, current_app
from ..auth.auth_required import token_required
from werkzeug.datastructures import FileStorage
import os
import uuid


clip_bp = Blueprint('clip', __name__)


@clip_bp.route('/clip-upload', methods=['POST'])
@token_required
def uploadClips():
   
    str_data = request.form.to_dict()
    file_data = request.files

    username = str_data.get('uname')
    print(username)
    print(str_data)
    print (file_data)
    if not username:
        return jsonify({"error": "Missing username in form data."}), 400

    temp_dir = os.path.join(os.getcwd(), 'tmp')
    os.makedirs(temp_dir, exist_ok=True)

    file_paths = {}
    for key, file_storage_obj in file_data.items():
        if isinstance(file_storage_obj, FileStorage):
            unique_filename = f"{uuid.uuid4()}_{file_storage_obj.filename}"
            local_file_path = os.path.join(temp_dir, unique_filename)
            file_storage_obj.save(local_file_path)
            file_storage_obj.close()
            file_paths[key] = local_file_path
        else:
            return jsonify({"error": f"Incorrect data type for {key}. Expected FileStorage, got {type(file_storage_obj)}"}), 422


    task = current_app.celery.send_task(
        'tasks.upload_clips_task',
        args=[username, str_data, file_paths]
    )

    return jsonify({
        "message": "Upload started",
        "task_id": task.id
    }), 202
    
@clip_bp.route('/test_task', methods = ["POST"])
def test_task():
    task = current_app.celery.send_task('tasks.print_test_task', args=["testuser", {}, {}])
    return jsonify({"hello":"world"}), 200