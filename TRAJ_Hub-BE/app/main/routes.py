from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import os
from .. import users

main_bp = Blueprint('main', __name__, template_folder='../../pages/html')

@main_bp.route('/main')
@login_required
def main_page():
    user_data = users.get(current_user.id)["data"]
    return render_template('main.html', user_data=user_data)

@main_bp.route('/update_data', methods=['POST'])
@login_required
def update_data():
    data = request.json
    user_data = data.get('data')
    username = current_user.id

    user = users.get(username)
    if user:
        user['data'].update(user_data)
        return jsonify({"status": "success", "message": "Data updated."})
    return jsonify({"status": "fail", "message": "User not found."}), 404

# Set up Google Drive API credentials
SCOPES = ['https://www.googleapis.com/auth/drive.file']
SERVICE_ACCOUNT_FILE = 'path/to/your/service-account-file.json'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

@main_bp.route('/')
def home():
    return render_template('upload.html')

@main_bp.route('/upload-photo', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Save the file locally
        file_path = os.path.join('/tmp', file.filename)
        file.save(file_path)

        # Upload the file to Google Drive
        try:
            drive_service = build('drive', 'v3', credentials=credentials)
            file_metadata = {'name': file.filename}
            media = MediaFileUpload(file_path, mimetype=file.content_type)
            uploaded_file = drive_service.files().create(
                body=file_metadata, media_body=media, fields='id, webViewLink').execute()

            # Get the file URL
            file_url = uploaded_file.get('webViewLink')

            # Clean up the local file
            os.remove(file_path)

            return jsonify({'url': file_url}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'File upload failed'}), 500
