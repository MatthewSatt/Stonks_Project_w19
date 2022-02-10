from app.models import db, Watchlist


def seed_watchlists():

    user_watchlist1 = Watchlist(
        name="Great_Stonks", user_id=1)

    user_watchlist4 = Watchlist(
        name="Yolos", user_id=1)

    user_watchlist2 = Watchlist(
        name="Great_Stonks", user_id=2)

    user_watchlist3 = Watchlist(
        name="I_LOVE_STONKS", user_id=2)

    db.session.add(user_watchlist1)
    db.session.add(user_watchlist2)
    db.session.add(user_watchlist3)
    db.session.add(user_watchlist4)
    db.session.commit()

def undo_watchlists():
    db.session.execute('TRUNCATE Watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
