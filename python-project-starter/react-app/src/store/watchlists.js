const LOAD_WATCHLISTS = "watchlist/LOAD_WATCHLISTS"
const ADD_WATCHLIST = "watchlist/ADD_WATCHLIST"

const loadWatchlists = (watchlists) => {
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

const initialState = {};

const watchlistReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_WATCHLISTS: {
            newState = {}
            action.watchlists.forEach((watchlist) => {
                newState[watchlist.id] = watchlist
            })
            return { ...newState, ...state }
        }
        case ADD_WATCHLIST:
            newState = {
                ...state,
                [action.watchlist.id]: action.watchlist
            }
            return newState;

        default:
            return state
    }
}

export default watchlistReducer
