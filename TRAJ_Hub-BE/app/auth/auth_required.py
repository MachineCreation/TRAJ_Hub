

from flask import current_app, jsonify, request, make_response
from functools import wraps
import jwt
from config import ISSUER_NAME

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')

        if not token:
            resp = make_response(jsonify('Token is missing.'))
            resp.status_code = 401
            return resp

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            if data['iss'] != ISSUER_NAME:
                resp = make_response(jsonify("token issuer invalid"))
                resp.status_code = 401
                return resp
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            resp = make_response(jsonify('Invalid token'))
            resp.status_code = 401
            return resp

        return f(*args, **kwargs)

    return decorated
