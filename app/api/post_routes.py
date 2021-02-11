from flask import Blueprint, jsonify, request
from app.models import db, Post, Ruleset
from datetime import datetime, timedelta
from sqlalchemy import and_, desc

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


@post_routes.route('/competitions/recent', methods=['GET'])
def get_recent_competitions():
    """
    Grabs the five most recently created competitions
    """
    current_time = datetime.utcnow()
    competitions = Post.query.filter(
        and_(Post.rulesetId != None, Post.competitionEnd >= current_time)).order_by(desc(Post.competitionEnd)).limit(5).all()
    neat_competitions = [comp.to_dict_detailed() for comp in competitions]
    return {'competitions':neat_competitions}

@post_routes.route('/competitions/recently-closed', methods=['GET'])
def get_recent_closed_competitions():
    """
    Grabs the five most recently closed competitions
    """
    current_time = datetime.utcnow()
    competitions = Post.query.filter(
        and_(Post.rulesetId != None, Post.competitionEnd < current_time)).order_by(desc(Post.competitionEnd)).limit(5).all()
    neat_competitions = [comp.to_dict_detailed() for comp in competitions]
    return {'competitions':neat_competitions}

@post_routes.route('/competitions/<int:id>', methods=['GET'])
def get_competition(id):
    """
    Grabs the competition specified
    """
    competition = Post.query.get(id)
    if(competition):
        competition = competition.to_dict_detailed()
        return {'competition':competition}


    return {'notFound':True}
