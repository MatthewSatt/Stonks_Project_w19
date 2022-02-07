from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from numpy import require
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
    form = New_Watchlist()
    if form.validate_on_submit():
        watch = Watchlist(
            name = form.name.data()
        ),
        db.session.add(watch)
        db.session.commit()
        return watch.to_dict()
    return 'Unable to post New Watchlist'



@watchlist_routes.route("/<int:watchlistId>/delete", methods=['DELETE'])
@login_required
def deleteWatchlist(watchlistId):
    watchlist = Watchlist.query.filter_by(id=watchlistId).first()

    db.session.delete(watchlist)
    db.session.commit()
    return watchlist.to_dict()



@watchlist_routes.route("/<int:watchlistId>/edit", methods=['PUT'])
@login_required
def change_watchlist_name(watchlistId):
    watchlist = Watchlist.query.get(watchlistId)
    form = EditWatchlist()
    return 'Incomplete'
