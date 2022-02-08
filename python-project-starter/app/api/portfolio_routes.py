from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Portfolio, db

portfolio_routes = Blueprint("portfolio", __name__)

@portfolio_routes.route("/<int:user_id>")
def load_portfolio(user_id):
    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()
    return jsonify([portfolio.to_dict() for portfolio in user_portfolios])


@portfolio_routes.route("/<string:ticker>", methods=['POST'])
@login_required
def add_stonky(ticker):
    return print(ticker, 'booooooooood')
