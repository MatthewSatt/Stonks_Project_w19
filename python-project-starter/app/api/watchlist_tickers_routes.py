from flask import Blueprint, jsonify
from app.models import WatchlistTicker, db

watchlist_tickers_routes = Blueprint("watchlist-tickers", __name__)

@watchlist_tickers_routes.route("/<int:watchlist_id>")
def load_watchlist_tickers(watchlist_id):
    watchlist_tickers = WatchlistTicker.query.filter(WatchlistTicker.watchlist_id == watchlist_id).all()
    return jsonify([tickers.to_dict() for tickers in watchlist_tickers])
