from app.models import db, WatchlistTicker


def seed_watchlist_tickers():

    apple = WatchlistTicker(
        ticker="AAPL", watchlist_id=1)

    tesla = WatchlistTicker(
        ticker="TSLA", watchlist_id=1)

    facebook = WatchlistTicker(
        ticker="FB", watchlist_id=1)

    google = WatchlistTicker(
        ticker="GOOG", watchlist_id=2)

    disney = WatchlistTicker(
        ticker="DIS", watchlist_id=3)

    db.session.add(apple)
    db.session.add(tesla)
    db.session.add(facebook)
    db.session.add(google)
    db.session.add(disney)
    db.session.commit()

def undo_watchlist_tickers():
    db.session.execute('TRUNCATE WatchlistTickers RESTART IDENTITY CASCADE;')
    db.session.commit()
