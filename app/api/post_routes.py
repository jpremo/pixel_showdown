from flask import Blueprint, jsonify, request
from app.models import db, Post

post_routes = Blueprint('posts', __name__)

@post_routes.route('/', methods=['POST'])
def create_post():
    """
    Creates a new post based on request body
    """
    data = request.get_json(force=True)
    if data['body'] == 'Body':
        data['body'] = 'body'
    post = Post(
                userId=data['userId'],
                body=data['body'],
                rulesetId=data['rulesetId'],
                attachments=data['attachments'],
            )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()
