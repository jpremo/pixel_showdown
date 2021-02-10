from flask import Blueprint, jsonify, request
from app.models import db, Post, Ruleset
from datetime import datetime, timedelta

post_routes = Blueprint('posts', __name__)

@post_routes.route('/', methods=['POST'])
def create_post():
    """
    Creates a new post based on request body
    """
    data = request.get_json(force=True)
    ruleset = Ruleset.query.get(data['rulesetId'])
    ruleset = ruleset.to_dict()
    rules = ruleset['rules']
    end_time = datetime.utcnow() + timedelta(hours=rules['contestLength'])
    if data['body'] == 'Body':
        data['body'] = 'body'
    post = Post(
                userId=data['userId'],
                body=data['body'],
                rulesetId=data['rulesetId'],
                attachments=data['attachments'],
                competitionWinners={},
                competitionEnd=end_time
            )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()
