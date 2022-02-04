from app.models import db, PortfolioValue


def seed_portfolio_value():

    portfolio_val1 = PortfolioValue(
       value=6000.60, date="2/4/2022",  user_id=1)

    portfolio_val2 = PortfolioValue(
        value=7000.50, date="2/3/2022", user_id=1)

    portfolio_val3 = PortfolioValue(
        value=6400, date="2/2/2022", user_id=1)

    db.session.add(portfolio_val1)
    db.session.add(portfolio_val2)
    db.session.add(portfolio_val3)
    db.session.commit()

def undo_portfolio_value():
    db.session.execute('TRUNCATE PortfolioValues RESTART IDENTITY CASCADE;')
    db.session.commit()
