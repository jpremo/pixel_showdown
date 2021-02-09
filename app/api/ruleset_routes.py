from flask import Blueprint, jsonify, request
from app.models import db, Ruleset

ruleset_routes = Blueprint('rulesets', __name__)

@ruleset_routes.route('/', methods=['POST'])
def create_ruleset():
    """
    Retrieves and returns information on specified user
    """
    data = request.get_json(force=True)
    if data['description'] == '':
        data['description'] = 'description'
    if data['title'] == '':
        data['title'] = 'title'
    ruleset = Ruleset(
                userId=data['userId'],
                title=data['title'],
                description=data['description'],
                rules=data['rules'],
            )
    db.session.add(ruleset)
    db.session.commit()
    print(data)
    return 'returned'
