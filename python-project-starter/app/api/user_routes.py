from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/edit/<int:id>', methods=['PATCH'])
@login_required
def changeCred(id):
   obj = request.json
   username = obj["username"]
   user = User.query.get(id)
   print(user)
   user.username = username
   print(user.username)
   db.session.add(user)
   db.session.commit()
   return user.to_dict()
