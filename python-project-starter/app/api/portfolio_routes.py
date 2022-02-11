from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Portfolio, User, db

portfolio_routes = Blueprint("portfolio", __name__)

@portfolio_routes.route("/<int:user_id>")
def load_portfolio(user_id):
    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()
    return jsonify([portfolio.to_dict() for portfolio in user_portfolios])

# ticker, user_id, quanitity, average_price
@portfolio_routes.route("/<string:ticker>", methods=['POST', 'PUT'])
@login_required
def add_stonky(**args):
    object = request.json
    ticker = request.json["ticker"]
    quantity = request.json['quantity']
    portfolio_id = ticker[0]["id"]
    price_purchased = ticker[0]["current_price"]


    user_id = ticker[0]['user_id']
    cost = float(price_purchased) * int(float(quantity))
    print("COST", cost)
    user = User.query.get(user_id)
    updated_user_cash = cost * -1
    print("UPDATED USER CASH", updated_user_cash)
    new_cash_amount = user.cash + updated_user_cash
    print("NEWWWWWWCASH", new_cash_amount)
    user.cash = new_cash_amount

    match = Portfolio.query.filter(Portfolio.id == portfolio_id).first()
    match123 = Portfolio.query.get(portfolio_id)
    stock_info = match

    if stock_info:
        stock_info.average_price = ((float(stock_info.average_price) * float(stock_info.quantity)) + (float(price_purchased) * float(quantity))) / (float(stock_info.quantity) + float(quantity))
        stock_info.quantity = int(stock_info.quantity) + int(quantity)
    print("USER", user)
    db.session.add(user)
    db.session.add(stock_info)
    db.session.commit()
    return {"user": user.to_dict(), "stock": stock_info.to_dict()}


        #     stock_info = Portfolio(
    #         ticker = ticker,
    #         user_id = user_id,
    #         quantity = quantity,
    #         average_price = average_price,
    #     )

@portfolio_routes.route("/new/<string:ticker>", methods=['POST'])
@login_required
def buy_new_stock(**args):
    print("IN ROUTEEEEEE")
    ticker = request.json["ticker"]
    user_id = request.json["id"]
    quantity = request.json["quantity"]
    average_price = request.json["price"]
    # print("OBJECT IN API", object)
    new_buy = Portfolio(ticker=ticker, user_id=user_id, quantity=quantity, average_price=average_price)

    cost = float(average_price) * int(float(quantity))
    print("COST", cost)
    user = User.query.get(user_id)
    updated_user_cash = cost * -1
    print("UPDATED USER CASH", updated_user_cash)
    new_cash_amount = user.cash + updated_user_cash
    print("NEWWWWWWCASH", new_cash_amount)
    user.cash = new_cash_amount

    print("USER", user)
    db.session.add(user)
    db.session.add(new_buy)
    db.session.commit()
    return {"user": user.to_dict(), "stock": new_buy.to_dict()}


@portfolio_routes.route("/<ticker>", methods=['DELETE'])
@login_required
def delete_stonky(**args):
    obj = request.json["ticker"][0]
    quantity = obj['quantity']
    tick = obj['ticker']
    id = obj['user_id']
    port_id = obj["id"]
    price = obj["current_price"]

    cost = float(price) * int(float(quantity))
    print("COST", cost)
    user = User.query.get(id)
    new_cash_amount = user.cash + cost

    user.cash = new_cash_amount
    print("USER", user)

    match = Portfolio.query.filter(Portfolio.id == port_id).first()

    db.session.add(user)
    db.session.delete(match)
    db.session.commit()

    return {"stock": match.to_dict(), "user": user.to_dict()}
    # user_portfolio = Portfolio.query.filter(Portfolio.user_id == user_id).all()
    # item_to_delete = Portfolio.query.filter(Portfolio)


    # print("MATCHHHHH", match)
    # print("USERRRR", user_portfolio)
    # print("LOGICCCC", any(list == user_portfolio for list in match))
    # listArr =[]
    # listArr.append([single_list for single_list in user_portfolio])
    # for l in listArr[0]:
    #     if l in match:
    #         dict_l = l.to_dict()
    #         matchArr =[]
    #         matchArr.append([m.to_dict() for m in match])
    #         for m1 in matchArr[0]:
    #             if m1 == dict_l:
    #                 print("M11111111", m1)
    #                 if dict_l['quantity'] == m1['quantity']:
    #                     db.session.delete(m1)
    #                     db.session.commit()
    #                 elif dict_l['quantity'] < m1['quantity']:
    #                     m1['quantity']= m1['quantity'] - dict_l['quantity']
    #                     db.session.commit()
    #                 else:
    #                     print("Error!")
    # return "successful delete!"
