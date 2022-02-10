import React, { useEffect, useState } from 'react';
import '../MyStonks/index.css'
import { useDispatch, useSelector } from "react-redux";
import { loadUserWatchlists, delWatchlist } from '../../store/watchlists';
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
    const handleDelete = (e) =>{
        e.preventDefault();
        let watchlistId = list.id
        console.log("WATCHLISTID IN COMPONENT", watchlistId)
        dispatch(delWatchlist(watchlistId))
    }

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
        <div>
        <button>Add New Ticker to {list.name}</button>
        </div>
        <div>
        <button onClick={handleDelete}>Delete {list.name}</button>
        </div>

        </>
        )
};

export default Watchlist;
