from flask.cli import AppGroup
from .users import seed_users, undo_users
from .portfolio_value import seed_portfolio_value, undo_portfolio_value
from .portfolio import seed_portfolio, undo_portfolio
from .watchlist_ticker import seed_watchlist_tickers, undo_watchlist_tickers
from .watchlist import seed_watchlists, undo_watchlists

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_portfolio()
    seed_portfolio_value()
    seed_watchlists()
    seed_watchlist_tickers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_portfolio()
    undo_portfolio_value()
    undo_watchlists()
    undo_watchlist_tickers()
    # Add other undo functions here
