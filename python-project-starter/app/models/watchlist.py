from .db import db

class Watchlist(db.Model):
    __tablename__ = "Watchlists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="watchlists")
    watchlist_tickers = db.relationship("WatchlistTicker", back_populates="watchlists")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "watchlist_tickers": [watchlist_ticker.to_dict() for watchlist_ticker in self.watchlist_tickers]
        }
    # def to_dict_with_tickers(self):
    #     return {
    #         "id": self.id,
    #         "name": self.name,
    #         "user_id": self.user_id,
    #     }
