const LOAD_WATCHLISTS = "watchlist/LOAD_WATCHLISTS"
const ADD_WATCHLIST = "watchlist/ADD_WATCHLIST"
const DELETE_WATCHLIST = "watchlist/DELETE_WATCHLIST"
const EDIT_WATCHLIST = "watchlist/EDIT_WATCHLIST"
const ADD_TICKER = "watchlist/ADD_TICKER"

export const loadWatchlists = (watchlists) => {
    return {
        type: LOAD_WATCHLISTS,
        watchlists
    }
}

const add = (watchlist) => {
    return {
        type: ADD_WATCHLIST,
        watchlist
    }
}

const delList = (watchlistId) => {
    return {
        type: DELETE_WATCHLIST,
        watchlistId
    }
}

const edit = (watchlist) => {
    return {
        type: EDIT_WATCHLIST,
        watchlist
    }
}

export const addTickerToWatchlist = (newTicker, watchlist) =>{
    return {
        type: ADD_TICKER,
        newTicker,
        watchlist
    }
}

export const editWatchlist = (id, newName) => async (dispatch) =>{
    const res = await fetch(`/api/watchlist/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            newName,
            id
        })
    })
    if (res.ok){
        const editedWatchlist = await res.json();
        dispatch(edit(editedWatchlist))
        return editedWatchlist
    }
}


export const addWatchlist = (newName, user_id) => async (dispatch) =>{
    console.log("WATHCLIST NAME IN STORE", newName, user_id)
    const res = await fetch(`/api/watchlist/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            newName,
            user_id
        })
    })
    if (res.ok){
        const result = await res.json();
        console.log("RESULT IN STORE", result)
        dispatch(add(result))
        return result
    }
}


export const loadUserWatchlists = (userId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${userId}`, {
        headers: {"Content-Type": "application/json"}
    })
    if (res.ok) {
        const watchlists = await res.json();
        dispatch(loadWatchlists(watchlists))
        return watchlists
    }
}

export const delWatchlist = (watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/delete/${watchlistId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if(res.ok){
        dispatch(delList(watchlistId))
    }
}

const initialState = {};

const watchlistReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_WATCHLISTS: {
            newState = {}
            action.watchlists.forEach((watchlist) => {
                newState[watchlist.id] = watchlist
            })
            return { ...newState }
        }
        case ADD_WATCHLIST:
            newState = {
                ...state,
                [action.watchlist.id]: action.watchlist
            }
            return newState;
        case EDIT_WATCHLIST:
            newState = {
                ...state,
                [action.watchlist.id]: action.watchlist
            }
            return newState

        case DELETE_WATCHLIST: {
            newState = { ...state };
            delete newState[action.watchlistId];
            return newState
        }
        case ADD_TICKER:
            newState = { ...state }
            newState.action.watchlist.watchlist_tickers = {...action.watchlist.watchlist_tickers}
            return newState

        default:
            return state
    }
}

export default watchlistReducer
