import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadWatchlistTickers } from '../../store/watchlistTickers';
import Tickers from './tickers';

const WatchlistTickers = ({list}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    // const watchlistTickers = useSelector(state => state.watchlistTickersReducer)

    // useEffect(() => {
    //     async function getTickers() {
    //         await dispatch(loadWatchlistTickers(individualWatchlist.id))
    //     }
    //     getTickers()

    // }, [individualWatchlist])

    // useEffect(() => {
    //     let watchlistTickersArr = Object.values(watchlistTickers)
    //     setTickers(watchlistTickersArr)
    // }, [dispatch])


    return (
        <>
            {list.watchlist_tickers.map(ticker => (

            <div className='my-stonks-table'>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={ticker.id}>
                            <td>{ticker.ticker}</td>
                            <td> {ticker.price} </td>
                        </tr>
                    </tbody>
                    </table>
        </div>
            ))}
         {/* <Tickers watchlistTickers={watchlistTickers} /> */}

        </>
    )
}

export default WatchlistTickers
