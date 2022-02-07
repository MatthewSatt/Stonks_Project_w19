// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { loadWatchlistTickers } from '../../store/watchlistTickers';
// import Tickers from './tickers';

// const WatchlistTickers = ({individualWatchlist}) => {
//     const dispatch = useDispatch();

//     const watchlistTickers = useSelector(state => state.watchlistTickersReducer)

//     useEffect(() => {
//         async function getTickers() {
//             await dispatch(loadWatchlistTickers(individualWatchlist.id))
//         }
//         getTickers()

//     }, [individualWatchlist])

//     // useEffect(() => {
//     //     let watchlistTickersArr = Object.values(watchlistTickers)
//     //     setTickers(watchlistTickersArr)
//     // }, [dispatch])


//     return (
//         <>
//         <div>
//             testing
//         </div>
//          {/* <Tickers watchlistTickers={watchlistTickers} /> */}
//         </>
//     )
// }

// export default WatchlistTickers
