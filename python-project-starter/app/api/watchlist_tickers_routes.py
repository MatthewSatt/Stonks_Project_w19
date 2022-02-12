from flask import Blueprint, jsonify, request
from app.models import WatchlistTicker, Watchlist, db
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
    id = object['id']
    newTicker = WatchlistTicker(ticker=ticker, watchlist_id=watchlist_id)
    # watchlist = Watchlist.query.get(watchlist_id)
    db.session.add(newTicker)
    # user_watchlists = Watchlist.query.filter(Watchlist.user_id == id).all()

    # print("USERRR", watchlist)
    db.session.commit()
    return {"newTicker": newTicker.to_dict()}
    # return {"newTicker": newTicker.to_dict(), "watchlist": [watchlist.to_dict() for watchlist in user_watchlists]}
    # google = WatchlistTicker(
    #     ticker="GOOG", watchlist_id=2)



@watchlist_tickers_routes.route("/delete/<int:tickerId>", methods=['DELETE'])
@login_required
def delete_ticker(tickerId):
    ticker = WatchlistTicker.query.get(tickerId)
    db.session.delete(ticker)
    db.session.commit()
    return ticker.to_dict()
