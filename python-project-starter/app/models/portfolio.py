from .db import db

class Portfolio(db.Model):
    __tablename__ = "Portfolios"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    ticker = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer)
    average_price = db.Column(db.Numeric(10, 2))

    user = db.relationship("User", back_populates="portfolio")

    def to_dict(self):
        return {
            "id": self.id,
            "ticker": self.ticker,
            "user_id": self.user_id,
            "quantity": self.quantity,
            "average_price": self.average_price
        }
