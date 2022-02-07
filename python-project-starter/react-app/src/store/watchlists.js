LOAD_WATCHLISTS = "watchlist/LOAD_WATCHLISTS"

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
    if (res.ok) {
        const data = await res.json();
        dispatch(loadWatchlists(data))
        return data
    }
}

const initialState = {};

const watchlistReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_WATCHLISTS: {
            newState = {}
            action.watchlists.forEach((watchlist) => {
                newState[watchlist.id] = watchlists
            })
            return { ...newState, ...state }
        }
        default:
            return state
    }
}

export default watchlistReducer
