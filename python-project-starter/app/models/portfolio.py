from app.models import portfolio_value
from .db import db
import os
import finnhub


class Portfolio(db.Model):
    __tablename__ = "Portfolios"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    ticker = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer)
    average_price = db.Column(db.Float)

    user = db.relationship("User", back_populates="portfolio")


    def to_dict(self):

        #Code to pull the price for the ticker in the portfolio
        finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY2"))

        price = finnhub_client.quote(self.ticker.upper())

        #Calculate value and gain/loss
        value = price["c"] * self.quantity
        gain_loss = value - (self.quantity * self.average_price)

        return {
            "id": self.id,
            "ticker": self.ticker,
            "user_id": self.user_id,
            "quantity": self.quantity,
            "average_price": self.average_price,
            "current_price": price["c"],
            "value": value,
            "gain_loss": gain_loss
        }
