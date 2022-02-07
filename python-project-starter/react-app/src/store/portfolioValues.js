const LOAD_PORTFOLIO_VALUES = "portfolio/LOAD_PORTFOLIO_VALUES"

const loadPortfolioValues = (values) => {
    return {
        type: LOAD_PORTFOLIO_VALUES,
        values
    }
}

export const loadUserPortfolioValues = (userId) => async (dispatch) => {
    const res = await fetch(`/api/portfolio-values/${userId}`, {
        headers: {"Content-Type": "application/json"}
    })
    if (res.ok) {
        const values = await res.json();
        dispatch(loadPortfolioValues(values))
        return values
    }
}

const initialState = {};

const portfolioValuesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PORTFOLIO_VALUES: {
            newState = {}
            action.values.forEach((value) => {
                newState[value.id] = value
            })
            return { ...newState, ...state }
        }
        default:
            return state
    }
}

export default portfolioValuesReducer
