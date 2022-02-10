from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Watchlist, db
from app.forms import New_Watchlist
from app.forms import EditWatchlist

watchlist_routes = Blueprint("watchlist", __name__)

@watchlist_routes.route("/<int:user_id>")
def load_user_watchlist(user_id):
    user_watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    return jsonify([watchlist.to_dict() for watchlist in user_watchlists])



@watchlist_routes.route('/new', methods=['POST'])
@login_required
def new_watchlist():
    object = request.json
    name = object['newName']
    user_id = object['user_id']
    newWatchlist = Watchlist(name=name, user_id=user_id)
    db.session.add(newWatchlist)
    db.session.commit()
    return newWatchlist.to_dict()




@watchlist_routes.route("/delete/<int:watchlistId>", methods=['DELETE'])
@login_required
def deleteWatchlist(watchlistId):
    watchlist = Watchlist.query.get(watchlistId)

    db.session.delete(watchlist)
    db.session.commit()
    return watchlist.to_dict()



@watchlist_routes.route("/<int:watchlistId>/edit", methods=['PUT'])
@login_required
def change_watchlist_name(watchlistId):
    watchlist = Watchlist.query.get(watchlistId)
    form = EditWatchlist()
    return 'Incomplete'
