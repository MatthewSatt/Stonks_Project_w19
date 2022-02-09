from app.models import db, Portfolio

def seed_portfolio():

    user_portfolio1 = Portfolio(
        user_id=1, ticker="AAPL", quantity=10, average_price=160.50)

    user_portfolio2 = Portfolio(
        user_id=1, ticker="MSFT", quantity=5, average_price=301.10)

    user_portfolio3 = Portfolio(
        user_id=1, ticker="UAA", quantity=25, average_price=18.00)

    user_portfolio4 = Portfolio(
        user_id=1, ticker="TSLA", quantity=1, average_price=1200.34)

    user_portfolio5 = Portfolio(
        user_id=2, ticker="GOOG", quantity=2, average_price=500.50)

    user_portfolio6 = Portfolio(
        user_id=2, ticker="MTDR", quantity=5, average_price=43.60)

    user_portfolio7 = Portfolio(
        user_id=3, ticker="XOM", quantity=25, average_price=82.20)

    user_portfolio8 = Portfolio(
        user_id=3, ticker="DIS", quantity=3, average_price=150.34)

    db.session.add(user_portfolio1)
    db.session.add(user_portfolio2)
    db.session.add(user_portfolio3)
    db.session.add(user_portfolio4)
    db.session.add(user_portfolio5)
    db.session.add(user_portfolio6)
    db.session.add(user_portfolio7)
    db.session.add(user_portfolio8)
    db.session.commit()

def undo_portfolio():
    db.session.execute('TRUNCATE Portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()
