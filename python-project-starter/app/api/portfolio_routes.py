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
    object = request.json
    print("OBJECTTTT", object)
    ticker = request.json["ticker"]
    quantity = request.json['quantity']
    portfolio_id = ticker[0]["id"]
    price_purchased = ticker[0]["current_price"]

    match = Portfolio.query.filter(Portfolio.id == portfolio_id).first()
    match123 = Portfolio.query.get(portfolio_id)
    stock_info = match

    if stock_info:
        stock_info.average_price = ((float(stock_info.average_price) * float(stock_info.quantity)) + (float(price_purchased) * float(quantity))) / (float(stock_info.quantity) + float(quantity))
        stock_info.quantity = int(stock_info.quantity) + int(quantity)


    db.session.add(stock_info)
    db.session.commit()
    return stock_info.to_dict()

        #     stock_info = Portfolio(
    #         ticker = ticker,
    #         user_id = user_id,
    #         quantity = quantity,
    #         average_price = average_price,
    #     )

@portfolio_routes.route("/new/<string:ticker>", methods=['POST'])
@login_required
def buy_new_stock(**args):
    new_buy = Portfolio(**request.json)

    db.session.add(new_buy)
    db.session.commit()
    return new_buy.to_dict()


@portfolio_routes.route("/<string:ticker>", methods=['DELETE'])
@login_required
def delete_stonky(**args):
    ticker = request.json["ticker"]
    quantity = request.json['quantity']
    user_id = request.json['id']
    print("USER_IDDD", user_id)

    # match = Portfolio.query.filter(Portfolio.user_id == user_id).all()
    match = Portfolio.query.filter(Portfolio.ticker == ticker).first() and Portfolio.query.filter(Portfolio.user_id == user_id).first()
    print("MATCHHH", match)
    db.session.delete(match)
    db.session.commit()
    return "delete success"
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
