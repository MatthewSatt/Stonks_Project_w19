from flask import Blueprint, jsonify
from app.models import Portfolio, db

portfolio_routes = Blueprint("portfolio", __name__)

@portfolio_routes.route("/<int:user_id>")
def load_portfolio(user_id):
    print("USERID IN API", user_id)
    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()
    return jsonify([portfolio.to_dict() for portfolio in user_portfolios])
