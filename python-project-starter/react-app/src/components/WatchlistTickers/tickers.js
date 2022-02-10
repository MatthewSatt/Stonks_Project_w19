import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadWatchlistTickers, delWatchlistTicker } from '../../store/watchlistTickers';



const Tickers = ({ticker, list}) => {
    const dispatch = useDispatch();
    // const watchlistTickers = useSelector(state => state.watchlistTickersReducer)
    const user = useSelector(state => state.session.user)

    console.log(list)

    const handleDeleteTicker = (e, id) => {
        e.preventDefault()
        console.log("NEW TICKER IN COMPONENT", id)
        let tickerId = id
        dispatch(delWatchlistTicker(tickerId))
        // dispatch(loadWatchlistTickers(list.id))
    }
    // useEffect(() => {
    //     async function getTickers() {
    //         await dispatch(loadWatchlistTickers(list.id))
    //     }
    //     getTickers()

    // }, [])
    let tickerArr = Object.values(list)
    console.log("TICKER ARR", tickerArr)
    return (
        <>
                    <tr key={ticker.id}>
                            <td>{ticker.ticker}</td>
                            <td> {ticker.price} </td>
                            <td> <button onClick={(e) => handleDeleteTicker(e, ticker.id)}>X</button> </td>
                        </tr>
        </>
    )
}

export default Tickers
