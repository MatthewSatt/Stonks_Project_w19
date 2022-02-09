from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Portfolio, db

portfolio_routes = Blueprint("portfolio", __name__)

@portfolio_routes.route("/<int:user_id>")
def load_portfolio(user_id):
    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()
    return jsonify([portfolio.to_dict() for portfolio in user_portfolios])

# ticker, user_id, quanitity, average_price
@portfolio_routes.route("/<string:ticker>", methods=['POST', 'PUT'])
@login_required
def add_stonky(**args):
    ticker = request.json["ticker"]
    quantity = request.json['quantity']
    average_price = request.json['price']
    user_id = request.json['id']
    match = Portfolio.query.filter(Portfolio.ticker == ticker).first()
    user_portfolio = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    if match in user_portfolio:
        # Update
        stock_info = match

        match.average_price = ((float(match.average_price) * float(match.quantity)) + (float(average_price) * float(quantity))) / (float(match.quantity) + float(quantity))
        match.quantity = int(match.quantity) + int(quantity)

        db.session.commit()

    else:
        # New groot
        stock_info = Portfolio(
            ticker = ticker,
            user_id = user_id,
            quantity = quantity,
            average_price = average_price,
        )

    db.session.add(stock_info)
    db.session.commit()
    return 'Successful Post'


@portfolio_routes.route("/<string:ticker>", methods=['DELETE'])
@login_required
def delete_stonky(**args):
    ticker = request.json["ticker"]
    quantity = request.json['quantity']

    match = Portfolio.query.filter(Portfolio.ticker == ticker).first()
    print("FLAAAAG 1", quantity)
    print("FLAAAAG 2", match.quantity)
    if (int(quantity) == int(match.quantity)):
        db.session.delete(match)
        db.session.commit()
    elif (int(quantity) < int(match.quantity)):
        match.quantity = int(match.quantity) - int(quantity)
        db.session.commit()
    else:
        print("Error!")

    return "successful delete!"
