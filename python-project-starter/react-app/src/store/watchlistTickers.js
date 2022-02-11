//THIS MAY NOT BE NEEDED NOW THAT WATCHLIST INCLUDES TICKERS
import { addTickerToWatchlist } from './watchlists'
import { loadWatchlists } from './watchlists'

const LOAD_WATCHLIST_TICKERS = "watchlistTickers/LOAD_WATCHLISTS_TICKERS"
const ADD_WATCHLIST_TICKERS = "watchlistTickers/ADD_WATCHLISTS_TICKERS"
const DELETE_WATCHLIST_TICKERS = "watchlistTickers/DELETE_WATCHLISTS_TICKERS"

const loadTickers = (watchlistTickers) => {
    return {
        type: LOAD_WATCHLIST_TICKERS,
        watchlistTickers
    }
}

const add = (ticker) => {
    return {
        type: ADD_WATCHLIST_TICKERS,
        ticker
    }
}

export const addWatchlistTicker = (ticker, watchlistId, id) => async (dispatch) =>{
    console.log("USER ID IN STORE", id)
    const res = await fetch(`/api/watchlist-tickers/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ticker,
            watchlistId,
            id
        })
    })
    if (res.ok){
        const result = await res.json();
        console.log("RESULT IN STORE", result)
        // dispatch(add(result.newTicker))

        dispatch(loadWatchlists(result.watchlist))
        return result
    }
}

const delTicker = (tickerId) => {
    return {
        type: DELETE_WATCHLIST_TICKERS,
        tickerId
    }
}

export const delWatchlistTicker = (tickerId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist-tickers/delete/${tickerId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok){
        dispatch(delTicker(tickerId))
    }
}


export const loadWatchlistTickers = (watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist-tickers/${watchlistId}`, {
        headers: {"Content-Type": "application/json"}
    })
    if (res.ok) {
        const watchlistTickers = await res.json();
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
        // case ADD_WATCHLIST_TICKERS:
        //     newState = {
        //         ...state,
        //         [action.ticker.id]: action.ticker
        //     }
        //     return newState;

        case DELETE_WATCHLIST_TICKERS: {
            newState = { ...state };
            console.log("newState", newState)
            delete newState[action.tickerId];
            return newState
        //     newState = JSON.parse(JSON.stringify(state));
        //     for (let i = 0; i < newState.watch.length; i++) {
        //       if (newState.watchlist_tickers[i].id === action.tickerId) {
        //         delete newState.watchlist_tickers[i];
        //       }
        //     }
        }
        default:
            return state;
    }
}

export default watchlistTickerReducer
