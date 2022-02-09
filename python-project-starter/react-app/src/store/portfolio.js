const LOAD_PORTFOLIO = "portfolio/LOAD_PORTFOLIO"

const loadPortfolio = (portfolios) => {
    return {
        type: LOAD_PORTFOLIO,
        portfolios
    }
}

export const loadUserPortfolios = (userId) => async (dispatch) => {
    const res = await fetch(`/api/portfolio/${userId}`, {
        headers: {"Content-Type": "application/json"}
    })
    if (res.ok) {
        const portfolios = await res.json();
        dispatch(loadPortfolio(portfolios))
        return portfolios
    }
}

const initialState = {};

const portfolioReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PORTFOLIO: {
            newState = {}
            action.portfolios.forEach((portfolio) => {
                newState[portfolio.id] = portfolio
            })
            return { ...newState }
        }
        default:
            return state
    }
}

export default portfolioReducer
