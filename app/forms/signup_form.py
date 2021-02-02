from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Email
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Username is required")])
    email = StringField('email', validators=[DataRequired(message="Email is required"), user_exists, Email(message="Please enter a valid email")])
    password = StringField('password', validators=[DataRequired(message="Password is required")])
    firstName = StringField('firstName', validators=[DataRequired(message="First Name is required")])
    lastName = StringField('lastName', validators=[DataRequired(message="Last Name is required")])
