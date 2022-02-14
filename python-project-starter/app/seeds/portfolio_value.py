from app.models import db, PortfolioValue
from datetime import datetime, timedelta


def seed_portfolio_value():
    today = datetime.now()
    day_before = today - timedelta(days = 1)
    day_before2 = today - timedelta(days = 2)
    day_before3 = today - timedelta(days = 3)
    day_before4 = today - timedelta(days = 4)
    day_before5 = today - timedelta(days = 5)

    portfolio_val1 = PortfolioValue(
       value=5000.00, date=day_before5,  user_id=1)

    portfolio_val2 = PortfolioValue(
        value=4689.45, date=day_before4, user_id=1)

    portfolio_val3 = PortfolioValue(
        value=5000.30, date=day_before3, user_id=1)

    portfolio_val10 = PortfolioValue(
        value=5505.33, date=day_before2, user_id=1)

    portfolio_val11 = PortfolioValue(
        value=5601.22, date=day_before, user_id=1)

    portfolio_val4 = PortfolioValue(
       value=6000.60, date=day_before,  user_id=3)

    portfolio_val5 = PortfolioValue(
        value=7000.50, date=day_before2, user_id=3)

    portfolio_val6 = PortfolioValue(
        value=6400.00, date=day_before3, user_id=3)

    portfolio_val7 = PortfolioValue(
       value=678.60, date=day_before,  user_id=2)

    portfolio_val8 = PortfolioValue(
        value=300.50, date=day_before2, user_id=2)

    portfolio_val9 = PortfolioValue(
        value=200.00, date=day_before3, user_id=2)

    db.session.add(portfolio_val1)
    db.session.add(portfolio_val2)
    db.session.add(portfolio_val3)
    db.session.add(portfolio_val4)
    db.session.add(portfolio_val5)
    db.session.add(portfolio_val6)
    db.session.add(portfolio_val7)
    db.session.add(portfolio_val8)
    db.session.add(portfolio_val9)
    db.session.add(portfolio_val10)
    db.session.add(portfolio_val11)
    db.session.commit()

def undo_portfolio_value():
    db.session.execute('TRUNCATE PortfolioValues RESTART IDENTITY CASCADE;')
    db.session.commit()
