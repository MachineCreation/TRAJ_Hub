from flask import Blueprint, jsonify, request
from models import weapon_api_key
from config import API_BASE_URL
from ..auth.auth_required import token_required
import requests

proxy_bp = Blueprint('proxy', __name__)

restricted_endpoints = [
    "update_api_data"
]

@proxy_bp.route('/api-proxy/<path:endpoint>', methods=['GET'])
@token_required
def api_proxy(endpoint):
    if endpoint in restricted_endpoints:
        return jsonify({"Error": "Route Restricted, Unauthorized"}), 401
    api_key = weapon_api_key
    if not api_key:
        return jsonify({"error": "API key is not configured"}), 500
    
    else:    
        api_url = f"{API_BASE_URL}{endpoint}"
        headers = {"X-API-Key": f"{api_key}"}
        response = requests.get(api_url, headers=headers, params=request.args)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from the API"}), response.status_code
   
        return jsonify(response.json())

@proxy_bp.route('/api-post/<path:endpoint>', methods=['POST'])
@token_required
def api_post(endpoint):
    if endpoint in restricted_endpoints:
        return jsonify({"Error": "Route Restricted, Unauthorized"}), 401
    api_key = weapon_api_key
    if not api_key:
        return jsonify({"error": "API key is not configured"}), 500
    
    else:
        api_url = f"{API_BASE_URL}{endpoint}"  
        headers = {"X-API-Key": f"{api_key}"}
        response = requests.post(api_url, headers=headers, params=request.args)

        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from the API"}), response.status_code
   
        return jsonify(response.json())

@proxy_bp.route('/api/<path:endpoint>', methods=['POST'])
@token_required
def api(endpoint):
    if endpoint in restricted_endpoints:
        return jsonify({"Error": "Route Restricted, Unauthorized"}), 401
    api_key = weapon_api_key
    if not api_key:
        return jsonify({"error": "API key is not configured"}), 500
    
    else:
        api_url = f"{API_BASE_URL}{endpoint}"  
        headers = {
            "X-API-Key": f"{api_key}",
            "Content-Type": "application/json"
            }
            
        data = request.get_json()        
        response = requests.post(api_url, headers=headers, json=data)


        if response.status_code != 200:
            return jsonify({
                "error": "Failed to fetch data from the API",
                "details": response.text
            }), response.status_code
   
        return jsonify(response.json())

