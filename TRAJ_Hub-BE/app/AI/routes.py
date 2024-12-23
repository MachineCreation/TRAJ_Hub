from flask import Blueprint, jsonify, request
import openai
from config import OPENAI_API_KEY


AI_bp = Blueprint('AI', __name__)
openai.api_key = OPENAI_API_KEY

@AI_bp.route('/chat')
def chat():
    try:
        # Get the user prompt from the frontend request
        data = request.get_json()
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Make a call to the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )

        # Return the AI's response to the frontend
        return jsonify({"response": response['choices'][0]['message']['content']})

    except Exception as e:
        return jsonify({"error": str(e)}), 500