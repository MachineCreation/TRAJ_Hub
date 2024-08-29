from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from models import User, supabase_service
import json

main_bp = Blueprint('main', __name__, template_folder='../../pages/html')

@main_bp.route('/main')                                                         # route to main page
@login_required
def main_page():
    user_data = User.get(current_user.id)[1]
    return render_template('main.html', user_data=user_data)

@main_bp.route('/get-member-profile', methods=['POST'])
def memberProfile():
    try:
        data = request.get_json()
        member = data.get('member')
        
        print(f"Received data: {data}")  # Log the received data
        print(f"Member: {member}")  # Log the extracted member name

        if not member:
            return jsonify({'error': 'Member not provided'}), 400

        response = supabase_service.from_('Loadouts').select('*').eq("name", member).execute()
        print(f"Supabase response: {response}")  # Log the response from Supabase
        if not response.data:
            return jsonify({'error': response.error.message}), 500

        # If needed, you can process response.data here to further ensure it's correctly formatted
        processed_data = []
        for row in response.data:
            # Parse any JSON strings that should be JSON objects
            row['primary-weapon'] = json.loads(row['primary-weapon'])
            row['secondary-weapon'] = json.loads(row['secondary-weapon'])
            row['lethal'] = json.loads(row['lethal'])
            row['perk1'] = json.loads(row['perk1'])
            row['perk2'] = json.loads(row['perk2'])
            row['perk3'] = json.loads(row['perk3'])
            row['perk4'] = json.loads(row['perk4'])
            row['tactical'] = json.loads(row['tactical'])
            processed_data.append(row)

        return jsonify(processed_data), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500

        return jsonify({'error': 'Internal server error'}), 500
