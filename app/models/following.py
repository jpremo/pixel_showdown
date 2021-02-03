from .db import db
import datetime

followings = db.Table(
    "followings",
    db.Column('interactionId', db.Integer, primary_key=True),
    db.Column("following", db.Integer, db.ForeignKey("users.id")),
    db.Column("follower", db.Integer, db.ForeignKey("users.id")),
    db.Column('created_at', db.DateTime, default=datetime.datetime.utcnow)
)
