
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


const ADD_STONK = 'stock/ADD_STONK'

export const addStonk = (stonk) => {
    return {
        type: ADD_STONK,
        stonk
    }
}

export const buyStonk = (ticker, quantity, price, id) => async (dispatch) =>{
    console.log(ticker, 'Store Ticker')
    console.log(quantity)
    console.log(price)
    console.log("ID IN STORE", id)
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
        console.log(data)
        dispatch(addStonk(data))
    } else {
        console.log("it's your STORE!!!!!!")
    }
}

const SELL_STONK = "stock/SELL_STONK"

export const sell_action = (stonk) => {
    return {
        type: SELL_STONK,
        stonk
    }
}

export const sellStonk = (ticker, quantity) => async (dispatch) => {

    const res = await fetch(`/api/portfolio/${ticker}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticker,
            quantity
        })
    })

    if (res.ok) {
        const data = await res.json()
        await dispatch(sell_action(data.ticker))
    }
}

const initialState = {};

const stockDetailReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_STOCK_DETAIL:
            newState = { ... state }
            newState.stockDetail = action.stockDetails
            return newState

        case ADD_STONK: {
            return {
                ...state,
                [action.list.id]: {
                    ...state[action.list.id],
                }
            }
        }

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
