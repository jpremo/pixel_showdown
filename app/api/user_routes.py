from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)

@user_routes.route('/<int:id>')
def user(id):
    """
    Retrieves and returns information on specified user
    """
    user = User.query.get(id)
    return user.to_dict()
