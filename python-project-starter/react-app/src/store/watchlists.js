const LOAD_WATCHLISTS = "watchlist/LOAD_WATCHLISTS"

const loadWatchlists = (watchlists) => {
    return {
        type: LOAD_WATCHLISTS,
        watchlists
    }
}

export const loadUserWatchlists = (userId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${userId}`, {
        headers: {"Content-Type": "application/json"}
    })
    console.log("RES IN STORE", res)
    if (res.ok) {
        const watchlists = await res.json();
        console.log("WATCHLISTS IN STORE", watchlists)
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
        default:
            return state
    }
}

export default watchlistReducer
