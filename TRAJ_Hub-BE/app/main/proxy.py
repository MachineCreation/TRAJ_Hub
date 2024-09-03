from flask import Blueprint, jsonify, request
from models import weapon_api_key
import requests

proxy_bp = Blueprint('proxy', __name__, template_folder="../../pages/html")

@proxy_bp.route('/api-proxy/<path:endpoint>', methods=['GET'])
def api_proxy(endpoint):
    api_key = weapon_api_key
    if not api_key:
        return jsonify({"error": "API key is not configured"}), 500
    
    # Correct the API base URL
    api_url = f"https://strippers.onrender.com/{endpoint}"  # Corrected base URL
    headers = {"Authorization": f"Bearer {api_key}"}
        
    # Forward the request to the actual API
    response = requests.get(api_url, headers=headers, params=request.args)

    # If the request failed, return an error
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from the API"}), response.status_code
   
    # Return the JSON response from the API
    return jsonify(response.json())