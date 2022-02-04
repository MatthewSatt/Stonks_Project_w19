from models.db import db

class PortfolioValue(db.Model):
    __tablename__ = "PortfolioValues"

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Decimal, nullable=False)
    date = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    portfolio = db.relationship("Portfolio", back_populates="portfolio_values")
    user = db.relationship("Users", back_populates="portfolio_values")

    def to_dict(self):
        return {
            "id": self.id,
            "value": self.value,
            "date": self.date,
            "user_id": self.user_id
        }
