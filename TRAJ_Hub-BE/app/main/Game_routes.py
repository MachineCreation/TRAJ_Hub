from flask import Blueprint, request, jsonify
from models import supabase_service
import json
import uuid

game_bp = Blueprint('game', __name__, template_folder='../../pages/html')

@game_bp.route('/save-score', methods=['POST'])
def save_score():
    try: 
        data = request.get_json()
        game = data.get('game')
        initials = data.get('initials')
        score = data.get('score')
        hit_count = data.get('hit_count')

        if not initials or not score or not hit_count:
            print(f"initials {initials} hit_count {hit_count} score {score}")
            return jsonify({'error': 'Missing required data'}), 400

        unique_id = str(uuid.uuid4())

        supabase_service.table(game).insert({
            'id': unique_id,
            'hit_count': hit_count,
            'score': score,
            'initials': initials
        }).execute()

        response = supabase_service.table(game).select('id', 'score').execute()
        rows = response.data

        if len(rows) > 100:
            sorted_rows = sorted(rows, key=lambda x: x['score'])

            rows_to_delete = len(rows) - 100

            ids_to_delete = [row['id'] for row in sorted_rows[:rows_to_delete]]
            for row_id in ids_to_delete:
                supabase_service.table(game).delete().eq('id', row_id).execute()

        return jsonify({'message': 'Score saved successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@game_bp.route('/leaderboard', methods=['POST'])
def get_leaderboard():
    try:
        data = request.get_json()
        game = data.get('game')
        print(game)
        
        response = supabase_service.table('Click-Arcade-1.0').select('*').execute()
        if not response.data:
            return jsonify({'error': response.error.message}), 500
        
        processed_data = []
        for row in response.data:
            processed_data.append(row)
            
        return jsonify(processed_data), 200
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'unknown', 'details': str(e)}), 500