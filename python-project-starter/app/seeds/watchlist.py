from app.models import db, Watchlist


def seed_watchlists():

    user_watchlist = Watchlist(
        name="Great_Stonks", user_id=1)

    db.session.add(user_watchlist)
    db.session.commit()

def undo_watchlists():
    db.session.execute('TRUNCATE Watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
