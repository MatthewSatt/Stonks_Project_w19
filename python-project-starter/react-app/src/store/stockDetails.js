
const SET_STOCK_DETAIL = 'stock/setStockDetail'

const setStockDetail = (stockDetails) =>{
    return {
        type: SET_STOCK_DETAIL,
        stockDetails
    }
}


export const getStockDetails = (ticker) => async (dispatch) => {
    const res = await fetch(`/api/stonk/${ticker}`)
    if(res.ok) {
        const stockDetails = await res.json();
        dispatch(setStockDetail(stockDetails))
    }
}

const initialState = {};

const stockDetailReducer = (state = initialState, action) =>{
    let newState;
    switch (action.type){
        case SET_STOCK_DETAIL:
            newState = { ... state }
            newState.stockDetail = action.stockDetails

            return newState
        default:
            return state
    }
};

export default stockDetailReducer
