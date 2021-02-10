from .db import db
from sqlalchemy.dialects.postgresql import JSONB
import datetime


class Post(db.Model):
    """A class used to represent post information"""
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(1000), nullable=False)
    attachments = db.Column(JSONB, nullable=False)
    competitionEnd = db.Column(db.DateTime, nullable=True)
    competitionWinners = db.Column(JSONB, nullable=True)
    rulesetId = db.Column(db.Integer, db.ForeignKey("rulesets.id"), nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", back_populates="posts")
    competition_images = db.relationship("Image", back_populates="competition")
    ruleset = db.relationship("Ruleset", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post")

    def to_dict(self):
        """A function that returns key object information in a readable format"""
        return {
            "id": self.id,
            "body": self.body,
            "attachments": self.attachments,
            "competitionEnd": self.competitionEnd,
            "competitionWinners": self.competitionWinners,
            "rulesetId": self.rulesetId,
            "userId": self.userId,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
