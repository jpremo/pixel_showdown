from .db import db
from sqlalchemy.dialects.postgresql import JSONB
import datetime


class Ruleset(db.Model):
    """A class used to represent ruleset information"""
    __tablename__ = 'rulesets'

    id = db.Column(db.Integer, primary_key=True)
    rules = db.Column(JSONB, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", back_populates="rulesets")
    posts = db.relationship("Post", back_populates="ruleset")

    def to_dict(self):
        """A function that returns key object information in a readable format"""
        return {
            "id": self.id,
            "rules": self.rules,
            "title": self.title,
            "description": self.description,
            "userId": self.userId,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
