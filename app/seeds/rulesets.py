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

    ruleset2 = Ruleset(
        description='''Try your best in this simple competition where animation is turned off.''',
        title='Animation not Allowed',
        rules={
            "fps": {
                "maxValue": 100,
                "minValue": 1,
                "defaultValue": 1
            },
            "width": {
                "maxValue": 100,
                "minValue": 1,
                "defaultValue": 16
            },
            "height": {
                "maxValue": 100,
                "minValue": 1,
                "defaultValue": 16
            },
            "brushSize": {
                "maxValue": 5,
                "minValue": 1,
                "defaultValue": 1
            },
            "pixelSize": {
                "maxValue": 100,
                "minValue": 1,
                "defaultValue": 20
            },
            "timeLimit": 5,
            "disableGrid": True,
            "totalFrames": {
                "maxValue": 1,
                "minValue": 1,
                "defaultValue": 1
            },
            "contestLength": 48,
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
            "disableCopyPaste": True,
            "disableAlphaPicker": False
        },
        userId=2
    )

    ruleset3 = Ruleset(
        description='''Grayscale images only. No custom colors allowed!''',
        title='Grayscale',
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
            "timeLimit": 2,
            "totalFrames": {
                "maxValue": 100,
                "minValue": 1,
                "defaultValue": 1
            },
            "contestLength": 1,
            "defaultPalette": [
                "#000000ff",
                "#4e4e4eff",
                "#a1a1a1ff",
                "#ddddddff",
                "#f4f4f4ff"
            ],
            "disableColorSelector": True
        },
        userId=2
    )

    ruleset4 = Ruleset(
        description='''The best rules are no rules. No restrictions whatsoever!''',
        title='Default',
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
            "timeLimit": 1,
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
            ]
        },
        userId=2
    )



    db.session.add(ruleset1)
    db.session.add(ruleset2)
    db.session.add(ruleset3)
    db.session.add(ruleset4)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_rulesets():
    db.session.execute('TRUNCATE rulesets RESTART IDENTITY CASCADE;')
    db.session.commit()
