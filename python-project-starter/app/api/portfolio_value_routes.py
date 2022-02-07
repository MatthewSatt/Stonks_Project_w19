from flask import Blueprint, jsonify
from app.models import PortfolioValue, db

portfolio_value_routes = Blueprint("portfolio-values", __name__)

@portfolio_value_routes.route("/<int:user_id>")
def load_portfolio(user_id):
    user_portfolio_values = PortfolioValue.query.filter(PortfolioValue.user_id == user_id).all()
    return jsonify([values.to_dict() for values in user_portfolio_values])
