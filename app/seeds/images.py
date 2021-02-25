from app.models import db, Image


def seed_images():

    image1 = Image(
        title='Happy Heart',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=1,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/heart_animation.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/heart_animation.png',
        userId=5,
    )
    image2 = Image(
        title='Happy Angel Emoji',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=1,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/angel_smile.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/angel_smile.png',
        userId=3,
    )
    image3 = Image(
        title='Happy Angel Emoji',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=1,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/heart_smile.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/heart_smile.png',
        userId=4,
    )
    image4 = Image(
        title='Fluffy Dog',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=2,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/pixel_puppy.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/pixel_puppy.png',
        userId=3,
    )
    image5 = Image(
        title='Karate Kat',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=2,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/karate_cat.gif',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/Karate_cat.gif',
        userId=5,
    )
    image6 = Image(
        title='Karate Kat',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=2,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/glubbers.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/glubbers.png',
        userId=4,
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
