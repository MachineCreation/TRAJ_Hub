

from flask import current_app, jsonify, request
from functools import wraps
import jwt

from models import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # JWT is passed in the request header
        if 'Authorization' in request.headers:
            bearer = request.headers['Authorization']
            token = bearer.split()[1]  # Assuming 'Bearer <token>'

        if not token:
            return jsonify({'message': 'Token is missing.'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user, _ = User.get(data['sub'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired.'}), 401
        except (jwt.InvalidTokenError, Exception):
            return jsonify({'message': 'Invalid token.'}), 401

        return f(current_user, *args, **kwargs)

    return decorated
