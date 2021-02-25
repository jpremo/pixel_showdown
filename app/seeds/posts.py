from app.models import db, Post
import datetime

def seed_posts():

    post1 = Post(body='''This is a really cool ruleset where you are not able to undo or erase anything.
                        Try to draw the cutest smiley face you can!''',
                attachments={},
                rulesetId=1,
                userId=2,
                competitionEnd=datetime.date(2200, 1, 1),
                )


    db.session.add(post1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
