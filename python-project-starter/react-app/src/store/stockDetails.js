
const SET_STOCK_DETAIL = 'stock/setStockDetail'

const setStockDetail = (details) =>{
    return {
        type: SET_STOCK_DETAIL,
        details
    }
}


export const getStockDetails = (ticker) => async (dispatch) => {
    const res = await fetch(`/api/`)
}
