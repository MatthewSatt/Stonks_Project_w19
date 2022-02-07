const LOAD_WATCHLIST_TICKERS = "watchlistTickers/LOAD_WATCHLISTS_TICKERS"

const loadTickers = (watchlistTickers) => {
    return {
        type: LOAD_WATCHLIST_TICKERS,
        watchlistTickers
    }
}

export const loadWatchlistTickers = (watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist-tickers/${watchlistId}`, {
        headers: {"Content-Type": "application/json"}
    })
    if (res.ok) {
        const watchlistTickers = await res.json();
        console.log("WATCHLISTS IN STORE", watchlistTickers)
        dispatch(loadTickers(watchlistTickers))
        return watchlistTickers
    }
}

const initialState = {};

const watchlistTickerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_WATCHLIST_TICKERS:{
            newState = {}
            action.watchlistTickers.forEach((ticker) => {
                newState[ticker.id] = ticker
            })
            return { ...newState, ...state}
        }

        default:
            return state;
    }
}

export default watchlistTickerReducer
