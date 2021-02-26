from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', firstName='Demo', lastName='User', biography='I am the demo user.')
    user1 = User(username='PostGuy', email='poster@place.com',
                password='asdfasdfweffasd', firstName='Post', lastName='Man', biography='I post things.')
    user2 = User(username='SnideCommenter102', email='user2@place.com',
                password='asdfweqfqdsaf', firstName='Snide', lastName='Commenter', biography='I am a person who values snide comments and good art.')
    user3 = User(username='FatCatFriend', email='user3@place.com',
                password='asdfqwe3qwefsda', firstName='Person', lastName='IsTheBest', biography='I like drawing fat cats and other chonky animals.')
    user4 = User(username='Friendly_Artist', email='user4@place.com',
                password='asdfweqefdsa', firstName='Friendly', lastName='Artist', biography='Art and friends go together like wine and cheese!')
    db.session.add(demo)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)

    demo.followcheck.append(user1)
    demo.followcheck.append(user2)
    demo.followcheck.append(user3)
    demo.followcheck.append(user4)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


def undo_followings():
    db.session.execute('TRUNCATE followings RESTART IDENTITY CASCADE;')
    db.session.commit()
