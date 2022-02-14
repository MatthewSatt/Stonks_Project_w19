import React, { useState, useEffect } from 'react';
import '../MyStonks/index.css'
import { useDispatch } from "react-redux";
import { delWatchlist, editWatchlist } from '../../store/watchlists';
import WatchlistTickers from '../WatchlistTickers';
// import { loadWatchlistTickers, delWatchlistTicker } from '../../store/watchlistTickers';
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { loadUserWatchlists } from '../../store/watchlists';


const Watchlist = ({ list, handleDeleteTicker }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [showWatchlist, setWatchlist] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [newWatchlistName, setNewWatchlistName] = useState(list.name)
    const [user1, setUser] = useState({});

    // const watchlists = useSelector(state => state.watchlistReducer)
    // const watchlistTickers = useSelector(state => state.watchlistTickersReducer)

    // useEffect(() => {
    //     async function getWatchlists() {
    //         await dispatch(loadUserWatchlists(user.id))
    //     }
    //     getWatchlists()
    // }, [dispatch])
    
    const handleDelete = (e) => {
        e.preventDefault();
        let watchlistId = list.id
        dispatch(delWatchlist(watchlistId))
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const id = list.id;
        const newName = newWatchlistName;
        dispatch(editWatchlist(id, newName))
        setShowEditForm(!showEditForm)
    }


    // useEffect(() => {
    //     async function getTickers() {
    //         await dispatch(loadWatchlistTickers(list.id))
    //     }
    //     getTickers()

    // }, [])





    //Returns the watchlist and the tickers associated with it.

    return (
        <>
            <div>
                <div className='watchlist__btn__container'>
                    <button
                        onClick={(e) => setWatchlist(!showWatchlist)}
                        className="accordion"
                    >
                        <h2>{list.name}</h2>
                    </button>
                    <div id='icons'>
                    <div>
                        <button className='edit__watchlist__btn' onClick={(e) => setShowEditForm(!showEditForm)}><FaPen className='edit__pen' /></button>
                    </div>
                    <div>
                        <button className='trash__btn' onClick={handleDelete}><FaTrashAlt className='trash' /></button>
                    </div>
                    </div>
                </div>
                {showEditForm && (
                    <form onSubmit={handleEdit}>
                        <div className='edit__watchlist__container'>
                            <input
                                className='edit__watchlist__input'
                                name="Watchlist"
                                placeholder='Watchlist Name..'
                                value={newWatchlistName}
                                onChange={e => setNewWatchlistName(e.target.value)}
                            >
                            </input>
                            <button className='submit__watchlist__btn' type="submit">Submit</button>
                        </div>
                    </form>
                )}
                {showWatchlist && (
                    <WatchlistTickers userWatchlists={user.watchlists} handleDeleteTicker={handleDeleteTicker} list={list} />
                )}
            </div>

        </>
    )
};

export default Watchlist;
