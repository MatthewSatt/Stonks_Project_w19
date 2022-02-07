import React, { useState, useEffect } from 'react';
import MyStonks from '../MyStonks';
import Watchlist from '../Watchlist';
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { loadUserPortfolios } from '../../store/portfolio';

const Portfolio = () => {
    const dispatch = useDispatch();

    const [showStonks, setStonks] = useState(false)
    const [showWatchlist, setWatchlist] = useState(false)

    const watchlist = ['Watchlist 1', 'Watchlist 2', 'Watchlist 3']
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => state.portfolioReducer)

    useEffect(() => {
        async function getPortfolios() {
            await dispatch(loadUserPortfolios(user.id))
        }
        getPortfolios()
    }, [setWatchlist])

    console.log(portfolios)


    const hideTable = {
        display: 'none',
    }

    return (
        <div className='accordion-container'>

            <button
                onClick={(e) => setStonks(!showStonks)}
                className={'accordion'}
            >
                My Stonks
            </button>

            {showStonks && <MyStonks />}

            {watchlist.map((list, i) => (

                <button
                    onClick={(e) => setWatchlist(!showWatchlist)}
                    className="accordion"
                >
                    {list}
                </button>


            ))}

            {showWatchlist && <Watchlist />}


        </div >)
};

export default Portfolio;
