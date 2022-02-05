import { useState } from 'react';
import MyStonks from '../MyStonks';
import Watchlist from '../Watchlist';
import './index.css'

const Portfolio = () => {

    const [showStonks, setStonks] = useState(false)
    const [showWatchlist, setWatchlist] = useState(false)

    const watchlist = ['Watchlist 1', 'Watchlist 2', 'Watchlist 3']



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
