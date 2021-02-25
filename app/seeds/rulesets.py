from app.models import db, Ruleset


def seed_rulesets():

    ruleset1 = Ruleset(
        description='''No takebacks, no problems! The eraser and undo tools are turned off. Have fun!''',
        title='No Takebacks',
        rules={
                    "fps": {
                        "maxValue": 100,
                        "minValue": 1,
                        "defaultValue": 1
                    },
            "width": {
                        "maxValue": 100,
                        "minValue": 1,
                        "defaultValue": 32
                    },
            "height": {
                        "maxValue": 100,
                        "minValue": 1,
                        "defaultValue": 32
                    },
            "brushSize": {
                        "maxValue": 100,
                        "minValue": 1,
                        "defaultValue": 1
                    },
            "pixelSize": {
                        "maxValue": 100,
                        "minValue": 1,
                        "defaultValue": 20
                    },
            "timeLimit": 0.5,
            "totalFrames": {
                        "maxValue": 100,
                        "minValue": 1,
                        "defaultValue": 1
                    },
            "contestLength": 1,
            "defaultPalette": [
                        "#f44336ff",
                        "#e91e63ff",
                        "#9c27b0ff",
                        "#673ab7ff",
                        "#3f51b5ff",
                        "#2196f3ff",
                        "#03a9f4ff",
                        "#00bcd4ff",
                        "#009688ff",
                        "#4caf50ff",
                        "#8bc34aff",
                        "#cddc39ff",
                        "#ffeb3bff",
                        "#ffc107ff",
                        "#ff9800ff",
                        "#ff5722ff",
                        "#795548ff",
                        "#607d8bff"
                    ],
            "disableUndoRedo": True,
            "disableCopyPaste": True
        },
        userId=2
    )

    db.session.add(ruleset1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_rulesets():
    db.session.execute('TRUNCATE rulesets RESTART IDENTITY CASCADE;')
    db.session.commit()
