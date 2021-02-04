from flask import Blueprint, jsonify, request
from app.models import Image, db

image_routes = Blueprint('images', __name__)


@image_routes.route('/', methods=['POST'])
def image_post():
    data = request.get_json(force=True)
    # user = Image.query.filter(Image.imgUrl.contains(data.code)).all()
    image = Image(
        title=data['title'],
        grid=data['grid'],
        imgUrl=data['imgUrl'],
        userId=data['userId'],
        competitionId=data['competitionId'],
    )
    db.session.add(image)
    db.session.commit()
    return image.to_dict()

@image_routes.route('/<int:id>')
def image_get(id):
    print('route hit \n \n')
    image = Image.query.get(int(id))
    return image.to_dict()
