from tokenize import String
from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

from app.models import Watchlist


def editValidator(form, field):
    name = field.data
    watchlist = Watchlist.query.filter(Watchlist.name == name).first()
    if watchlist:
        raise ValidationError("Name already exists")

class EditWatchlist(FlaskForm):
    name = StringField('Watchlist Name', validators=[DataRequired(), editValidator])
