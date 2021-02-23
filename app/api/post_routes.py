from flask import Blueprint, jsonify, request
from app.models import db, Post, Ruleset, Image
from datetime import datetime, timedelta
from sqlalchemy import and_, desc
import math

post_routes = Blueprint('posts', __name__)

def calculate_points(place, entries):
    if entries == 1:
        return 1
    if entries == 2:
        if place == 0:
            return 2
        if place == 1:
            return 1
    total_points = entries*2
    first_points = total_points / 2
    total_points = total_points - first_points
    second_points = math.ceil(total_points * .66)
    total_points = total_points - second_points
    third_points = total_points
    points_list = [first_points,second_points,third_points]
    return points_list[place]


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


@post_routes.route('/competitions/<int:id>', methods=['PUT'])
def competition_results(id):
    """
    Grabs the competition specified
    """
    data = request.get_json(force=True)
    imgArr = data['competitionWinners']
    competition = Post.query.get(id)
    competitionImageLength = len(competition.competition_images)
    for i in range(0,len(imgArr)):
        imageId = imgArr[i]
        if imageId != None:
            image = Image.query.get(imageId)
            if image:
                image.place = i
                image.points = calculate_points(i,competitionImageLength)
                db.session.commit()
    competition = Post.query.get(id)
    competition.judged = True
    competition.updated_at = datetime.now()
    db.session.commit()
    competition = competition.to_dict_detailed()
    return {'images':competition['images']}
