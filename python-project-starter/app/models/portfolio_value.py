from .db import db

class PortfolioValue(db.Model):
    __tablename__ = "PortfolioValues"

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Numeric(10, 2), nullable=False)
    date = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="portfolio_value")

    def to_dict(self):
        return {
            "id": self.id,
            "value": self.value,
            "date": self.date,
            "user_id": self.user_id
        }
