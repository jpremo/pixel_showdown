from .db import db
from sqlalchemy.dialects.postgresql import JSONB
import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(1000), nullable=False)
    attachments = db.Column(JSONB, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "attachments": self.attachments,
            "userId": self.userId,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
