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
        title='Happy Heart Emoji',
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
        title='Forbidden Fern',
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
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/forbidden_fern.gif',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/forbidden_fern.gif',
        userId=3,
        points=1,
        place=2,
    )
    image5 = Image(
        title='Plant Doggo',
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
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/plant_dog.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/plant_dog.png',
        userId=5,
        points=3,
        place=0
    )
    image6 = Image(
        title='Plain tree with side of tree',
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
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/tree.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/tree.png',
        userId=4,
        points=2,
        place=1
    )
    image7 = Image(
        title='Carpet a la my house',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=3,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/gray_carpet.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/gray_carpet.png',
        userId=3,
    )
    image8 = Image(
        title='Fwoosh Plane',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=3,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/gray_airplane.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/gray_airplane.png',
        userId=4,
    )
    image9 = Image(
        title='Is Rock?',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=3,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/gray_rock.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/gray_rock.png',
        userId=5,
    )
    image10 = Image(
        title='Calming Water',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=4,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/water.jpg',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/water.jpg',
        userId=3,
    )
    image11 = Image(
        title='Anger Pear',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=4,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/pear.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/pear.png',
        userId=5,
    )
    image12 = Image(
        title='Bouncer Ball',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=4,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/bouncy_ball.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/bouncy_ball.png',
        userId=4,
    )
    image13 = Image(
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
        competitionId=5,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/pixel_puppy.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/pixel_puppy.png',
        userId=3,
    )
    image14 = Image(
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
        competitionId=5,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/karate_cat.gif',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/Karate_cat.gif',
        userId=4,
    )
    image15 = Image(
        title='Glubbers',
        grid={
            "gridColors": [
                {}
            ],
            "width": 32,
            "height": 32,
            "fps": 1,
            "totalFrames": 1
        },
        competitionId=5,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/glubbers.png',
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/Static/PS_Seed_Images/glubbers.png',
        userId=5,
    )
    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
