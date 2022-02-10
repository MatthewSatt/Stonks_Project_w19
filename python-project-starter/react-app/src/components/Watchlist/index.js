import React, { useEffect, useState } from 'react';
import '../MyStonks/index.css'
import { useDispatch, useSelector } from "react-redux";
import { loadUserWatchlists } from '../../store/watchlists';
import WatchlistTickers from '../WatchlistTickers';


const Watchlist = ({list}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [showWatchlist, setWatchlist] = useState(false)
    // const watchlists = useSelector(state => state.watchlistReducer)

    // useEffect(() => {
    //     async function getWatchlists() {
    //         await dispatch(loadUserWatchlists(user.id))
    //     }
    //     getWatchlists()
    // }, [])


    //Returns the watchlist and the tickers associated with it.

    return (
        <>
        <div>
        <button
        onClick={(e) => setWatchlist(!showWatchlist)}
        className="accordion"
        >
            {list.name}
        </button>
            {showWatchlist && (
                <WatchlistTickers list={list} />
            )}
        </div>

        </>
        )
};

export default Watchlist;
