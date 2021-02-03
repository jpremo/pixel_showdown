from .db import db
from sqlalchemy.dialects.postgresql import JSON
import datetime


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    grid = db.Column(JSON, nullable=False)
    imgUrl = db.Column(db.String(1000), nullable=False, default='')
    competitionId = db.Column(
        db.Integer, db.ForeignKey("posts.id"), nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", back_populates="images")
    competition = db.relationship("Post", back_populates="competition_images")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "grid": self.grid,
            "imgUrl": self.imgUrl,
            "competitionId": self.competitionId,
            "userId": self.userId,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
