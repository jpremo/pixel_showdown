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
    post2 = Post(body='''Plz draw a plant 4 me. No ferns allowed. I hate ferns 5ever. Ferns r4 losers.''',
                 attachments={},
                 rulesetId=4,
                 userId=2,
                 competitionEnd=datetime.date(2021, 2, 1),
                 judged=True,
                 )
    post3 = Post(body='''Draw whatever you want! The catch? No colorful colors allowed!''',
                 attachments={},
                 rulesetId=3,
                 userId=2,
                 competitionEnd=datetime.date(2200, 1, 1),
                 )
    post4 = Post(body='''Draw whatever you want! May the best drawing win!''',
                 attachments={},
                 rulesetId=4,
                 userId=2,
                 competitionEnd=datetime.date(2200, 1, 1),
                 )
    post5 = Post(body='''Draw the best dog/cat/floofer/pet that you can!''',
                 attachments={},
                 rulesetId=2,
                 userId=2,
                 competitionEnd=datetime.date(2200, 1, 1),
                 )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
