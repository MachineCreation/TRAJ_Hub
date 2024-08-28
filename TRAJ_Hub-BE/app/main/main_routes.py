from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from models import User, supabase_service

main_bp = Blueprint('main', __name__, template_folder='../../pages/html')

@main_bp.route('/main')                                                         # route to main page
@login_required
def main_page():
    user_data = User.get(current_user.id)[1]
    return render_template('main.html', user_data=user_data)

@main_bp.route('/get-member-profile', methods=['GET'])
def member_profile():
    member = request.args.get('member')

    try:
        if member:
            response = supabase_service.table('Loadouts').select('*').eq("name", member).execute()

            if response.data:
                return jsonify(response.data), 200
            else:
                return jsonify({'error': 'No data found for the member'}), 404
        else:
            return jsonify({'error': 'No member name provided'}), 400
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred while fetching member profile'}), 500

    