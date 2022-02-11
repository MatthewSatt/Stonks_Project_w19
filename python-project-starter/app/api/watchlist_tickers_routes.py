from flask import Blueprint, jsonify, request
from app.models import WatchlistTicker, db
from flask_login import login_required

watchlist_tickers_routes = Blueprint("watchlist-tickers", __name__)

@watchlist_tickers_routes.route("/<int:watchlist_id>")
def load_watchlist_tickers(watchlist_id):
    watchlist_tickers = WatchlistTicker.query.filter(WatchlistTicker.watchlist_id == watchlist_id).all()
    return jsonify([tickers.to_dict() for tickers in watchlist_tickers])

@watchlist_tickers_routes.route('/new', methods=['POST'])
@login_required
def create_new_ticker():
    object = request.json
    ticker = object['ticker']
    watchlist_id = object['watchlistId']
    newTicker = WatchlistTicker(ticker=ticker, watchlist_id=watchlist_id)
    db.session.add(newTicker)
    db.session.commit()
    return newTicker.to_dict()

    # google = WatchlistTicker(
    #     ticker="GOOG", watchlist_id=2)



@watchlist_tickers_routes.route("/delete/<int:tickerId>", methods=['DELETE'])
@login_required
def delete_ticker(tickerId):
    ticker = WatchlistTicker.query.get(tickerId)
    db.session.delete(ticker)
    db.session.commit()
    return ticker.to_dict()
