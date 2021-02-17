from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Email, Regexp
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Entered email is already registered.")


def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Entered username is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Username is required."), username_exists, Regexp('^\w+$', message="Username may only contain letters, numbers, and underscores."),])
    email = StringField('email', validators=[DataRequired(message="Email is required."), user_exists, Email(message="Please enter a valid email.")])
    password = StringField('password', validators=[DataRequired(message="Password is required.")])
    firstName = StringField('firstName', validators=[DataRequired(message="First Name is required.")])
    lastName = StringField('lastName', validators=[DataRequired(message="Last Name is required.")])
