from app.models import db, PortfolioValue
from datetime import datetime, timedelta


def seed_portfolio_value():
    today = datetime.now()
    day_before = today - timedelta(days = 1)
    day_before2 = today - timedelta(days = 2)
    day_before3 = today - timedelta(days = 3)

    portfolio_val1 = PortfolioValue(
       value=6000.60, date=day_before,  user_id=1)

    portfolio_val2 = PortfolioValue(
        value=7000.50, date=day_before2, user_id=1)

    portfolio_val3 = PortfolioValue(
        value=6400, date=day_before3, user_id=1)

    db.session.add(portfolio_val1)
    db.session.add(portfolio_val2)
    db.session.add(portfolio_val3)
    db.session.commit()

def undo_portfolio_value():
    db.session.execute('TRUNCATE PortfolioValues RESTART IDENTITY CASCADE;')
    db.session.commit()
