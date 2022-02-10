import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadWatchlistTickers } from '../../store/watchlistTickers';
import Tickers from './tickers';

const WatchlistTickers = ({list}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [stonkTickers, setStonkTickers] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
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



    let tickerArr = list.watchlist_tickers.map(ticker => {
        return ticker["ticker"]
    })

    console.log("TICKERARRRRR", tickerArr)


    useEffect(() => {
        async function getValues() {
          const response = await fetch(`/api/stonk/user/${tickerArr}`);
          const values = await response.json();
          setStonkTickers(values)
          setIsLoaded(true)
        }
        getValues()
      }, [list]);

      console.log("STONK TICKERSSS", stonkTickers)

    if (isLoaded){
        return (
            <>
            {stonkTickers.map(ticker => (

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
                            <td>{ticker[0]}</td>
                            <td> {ticker[1]} </td>
                        </tr>
                    </tbody>
                    </table>
        </div>
            ))}
         {/* <Tickers watchlistTickers={watchlistTickers} /> */}

        </>
    )
} else return (
<>
<div className='my-stonks-table'>
Loading...
</div>

</>)
}

export default WatchlistTickers
