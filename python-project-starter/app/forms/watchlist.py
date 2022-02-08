from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist


def watchlist_name_exists(form, field):
    name = field.data
    watchlist = Watchlist.query.filter(Watchlist.name == name).first()
    if watchlist:
        raise ValidationError("Watchlist name already exists.")



class New_Watchlist(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), watchlist_name_exists])
