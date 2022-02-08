from app.models import db, Portfolio

def seed_portfolio():

    user_portfolio1 = Portfolio(
        user_id=1, ticker="AAPL", quantity=10, average_price=160.50)

    user_portfolio2 = Portfolio(
        user_id=1, ticker="MSFT", quantity=5, average_price=301.10)

    user_portfolio3 = Portfolio(
        user_id=1, ticker="UAA", quantity=25, average_price=18)

    user_portfolio4 = Portfolio(
        user_id=1, ticker="TSLA", quantity=1, average_price=1200.34)

    db.session.add(user_portfolio1)
    db.session.add(user_portfolio2)
    db.session.add(user_portfolio3)
    db.session.add(user_portfolio4)
    db.session.commit()

def undo_portfolio():
    db.session.execute('TRUNCATE Portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()
