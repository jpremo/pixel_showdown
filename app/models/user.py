from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from .following import followings
from sqlalchemy.orm import relationship, backref

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    biography = db.Column(db.String(1000), nullable=False, default='')
    profileImg = db.Column(db.String(1000), nullable=False, default='')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    images = db.relationship("Image", back_populates="user")
    posts = db.relationship("Post", back_populates="user")
    rulesets = db.relationship("Ruleset", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    # followings = db.relationship(
    #     "User",
    #     secondary=followings,
    #     back_populates='followers',
    #     primaryjoin=(followings.c.follower == id),
    #     secondaryjoin=(followings.c.following == id))

    followers = db.relationship(
        "User",
        secondary=followings,
        backref=backref('followings'),
        primaryjoin=(followings.c.following == id),
        secondaryjoin=(followings.c.follower == id))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "biography": self.biography,
            "profileImg": self.profileImg,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
