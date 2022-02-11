import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { editStonk, getStockDetails, sellStonk, buyStonk } from '../../store/stockDetails';
import { loadUserPortfolios } from '../../store/portfolio';
import { addWatchlistTicker } from '../../store/watchlistTickers';
import StockGraph from "../StockGraph"
import "./index.css"

const AddToWatchlist = ({handleAddToWatchlist, tickerExists}) => {



    return (
        <>
        {tickerExists && (

            <button className='notabutton' onClick={handleAddToWatchlist} >Add To Watchlist</button>
            )}

        </>
    )
};

export default AddToWatchlist;
