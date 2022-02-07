from flask import Blueprint, jsonify
from app.models import Watchlist, db

watchlist_routes = Blueprint("watchlist", __name__)

@watchlist_routes.route("/<int:user_id>")
def load_user_watchlist(user_id):
    user_watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    return jsonify([watchlist.to_dict() for watchlist in user_watchlists])
