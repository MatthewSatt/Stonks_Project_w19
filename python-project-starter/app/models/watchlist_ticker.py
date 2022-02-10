from .db import db
import finnhub
import os

class WatchlistTicker(db.Model):
    __tablename__ = "WatchlistTickers"

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    watchlist_id = db.Column(db.Integer, db.ForeignKey("Watchlists.id"), nullable=False)

    watchlists = db.relationship("Watchlist", back_populates="watchlist_tickers")

    def to_dict(self):

        #Code to pull the price for the ticker in the portfolio
        finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))

        price = finnhub_client.quote(self.ticker.upper())

        value = price["c"]

        return {
            "id": self.id,
            "ticker": self.ticker,
            "watchlist_id": self.watchlist_id,
            "price": value
        }
