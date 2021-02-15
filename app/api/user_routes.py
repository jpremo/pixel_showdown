from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)

@user_routes.route('/<int:id>')
def user(id):
    """
    Retrieves and returns information on specified user
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/profileImg', methods=["POST"])
def user_profileImg(id):
    """
    Retrieves and returns information on specified user
    """
    data = request.get_json(force=True)

    user = User.query.get(id)
    user.profileImg = data['profileImg']
    db.session.commit()
    return {'set': 'set'}
