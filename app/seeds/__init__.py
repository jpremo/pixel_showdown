from flask.cli import AppGroup
from .users import seed_users, undo_users, undo_followings
from .rulesets import seed_rulesets, undo_rulesets
from .posts import seed_posts, undo_posts
from .images import seed_images, undo_images
from .comments import seed_comments, undo_comments
from app.models import db
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_rulesets()
    seed_posts()
    seed_images()
    seed_comments()

# Creates the `flask seed undo` command


def clear_data():
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print('Clear table %s' % table)
        db.session.execute(table.delete())
    db.session.commit()

@seed_commands.command('undo')
def undo():
    # clear_data()
    undo_comments()
    undo_images()
    undo_posts()
    undo_rulesets()
    undo_followings()
    undo_users()
