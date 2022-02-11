import React from 'react';
// import { useDispatch } from "react-redux";
// import { loadWatchlistTickers, delWatchlistTicker } from '../../store/watchlistTickers';
import Tickers from './tickers';
// import { FaTrashAlt } from "react-icons/fa";

const WatchlistTickers = ({list, handleDeleteTicker}) => {
    // const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user)
    // const [newTickerId, setNewTickerId] = useState("")
    // const [stonkTickers, setStonkTickers] = useState("")
    // const watchlistTickers = useSelector(state => state.watchlistTickersReducer)

    // useEffect(() => {
    //     async function getTickers() {
    //         await dispatch(loadWatchlistTickers(list.id))
    //     }
    //     getTickers()

    // }, [list])
    // console.log("WATCHLIST", watchlistTickers)

    // useEffect(() => {
    //     let watchlistTickersArr = Object.values(watchlistTickers)
    //     setTickers(watchlistTickersArr)
    // }, [dispatch])

//The below use effect was to fetch individual prices.  May no longer need.
    // useEffect(() => {
    //     async function getValues() {
    //       const response = await fetch(`/api/stonk/user/${tickerArr}`);
    //       const values = await response.json();
    //       setStonkTickers(values)
    //       setIsLoaded(true)
    //     }
    //     getValues()
    //   }, [list]);
    console.log("LISTTTT", list)

        return (
            <>
            <div className='my-stonks-table'>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
            {list.watchlist_tickers.map(ticker => (
                    <Tickers key={ticker.id} ticker={ticker} handleDeleteTicker={handleDeleteTicker} list={list} />
                    ))}
                    </tbody>
                    </table>
        </div>

        </>
    )
}


export default WatchlistTickers
