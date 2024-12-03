from flask import Blueprint, jsonify, request
from models import weapon_api_key
from config import API_BASE_URL
import requests

proxy_bp = Blueprint('proxy', __name__, template_folder="../../pages/html")

@proxy_bp.route('/api-proxy/<path:endpoint>', methods=['GET'])
def api_proxy(endpoint):
    api_key = weapon_api_key
    if not api_key:
        return jsonify({"error": "API key is not configured"}), 500
    
    api_url = f"{API_BASE_URL}{endpoint}"
    headers = {"X-API-Key": f"{api_key}"}
        

    response = requests.get(api_url, headers=headers, params=request.args)

    # If the request failed, return an error
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from the API"}), response.status_code
   
    # Return the JSON response from the API
    return jsonify(response.json())

@proxy_bp.route('/api-post/<path:endpoint>', methods=['POST'])
def api_post(endpoint):
    api_key = weapon_api_key
    if not api_key:
        return jsonify({"error": "API key is not configured"}), 500
    
    api_url = f"{API_BASE_URL}{endpoint}"  
    headers = {"X-API-Key": f"{api_key}"}
        

    response = requests.post(api_url, headers=headers, params=request.args)

    # If the request failed, return an error
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from the API"}), response.status_code
   
    # Return the JSON response from the API
    return jsonify(response.json())

@proxy_bp.route('/api/<path:endpoint>', methods=['POST'])
def api(endpoint):
    api_key = weapon_api_key
    if not api_key:
        return jsonify({"error": "API key is not configured"}), 500
    
    api_url = f"{API_BASE_URL}{endpoint}"  
    headers = {
        "X-API-Key": f"{api_key}",
        "Content-Type": "application/json"
        }
        
    data = request.get_json()
    
    # Forward the request to the remote API
    response = requests.post(api_url, headers=headers, json=data)


    # If the request failed, return an error
    if response.status_code != 200:
        return jsonify({
            "error": "Failed to fetch data from the API",
            "details": response.text
        }), response.status_code
   
    # Return the JSON response from the API
    return jsonify(response.json())

