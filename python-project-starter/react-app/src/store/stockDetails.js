import { updateUser } from "./session"

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
        return stockDetails
    }
}


const EDIT_STONK = 'stock/EDIT_STONK'

export const edit = (stonk) => {
    return {
        type: EDIT_STONK,
        stonk
    }
}

export const editStonk = (ticker, quantity, price, id) => async (dispatch) =>{

    const res = await fetch(`/api/portfolio/${ticker}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticker,
            quantity,
            price,
            id
        })
    })
    if(res.ok) {
        let data = await res.json()
        console.log("DATA IN STORE", data)
        dispatch(edit(data.stock))
        await dispatch(updateUser(data.user))
    }
}

const BUY_STONK = "stock/BUY_STONK"

export const buy = (stonk) => {
    return {
        type: BUY_STONK,
        stonk
    }
}

export const buyStonk = (ticker, quantity, price, id) => async (dispatch) =>{
    console.log("IDDDD", id)
    const res = await fetch(`/api/portfolio/new/${ticker}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticker,
            quantity,
            price,
            id
        })
    })
    if(res.ok) {
        let data = await res.json()
        console.log("DATA STOCKKKK", data.stock)
        await dispatch(buy(data.stock))
        await dispatch(updateUser(data.user))

    }
}

const SELL_STONK = "stock/SELL_STONK"

export const sell_action = (stonk) => {
    return {
        type: SELL_STONK,
        stonk
    }
}

export const sellStonk = (ticker, quantity, price, id) => async (dispatch) => {
    const res = await fetch(`/api/portfolio/${ticker}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticker,
            quantity,
            price,
            id
        })
    })

    if (res.ok) {
        const data = await res.json()
        await dispatch(sell_action(data.stock))
        await dispatch(updateUser(data.user))
    }
}

const initialState = {};

const stockDetailReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_STOCK_DETAIL:
            newState = { ...state }
            newState.stockDetail = action.stockDetails
            return newState

        case BUY_STONK:
            newState = {
                ...state,
                [action.stonk.id]: [action.stonk]
            }
            return newState

        case EDIT_STONK:
            newState = {
                ...state,
                [action.stonk.id]: [action.stonk]
                }

            return newState

        case SELL_STONK: {
            const newState = {...state}
            delete newState[action.ticker]
            return newState
        }

        default:
            return state
    }
};



export default stockDetailReducer


// export const login = (email, password) => async (dispatch) => {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email,
//         password
//       })
//     });
