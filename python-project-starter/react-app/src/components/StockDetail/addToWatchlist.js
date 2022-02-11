import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { editStonk, getStockDetails, sellStonk, buyStonk } from '../../store/stockDetails';
import { loadUserPortfolios } from '../../store/portfolio';
import { addWatchlistTicker } from '../../store/watchlistTickers';
import StockGraph from "../StockGraph"
import "./index.css"

const AddToWatchlist = ({handleAddToWatchlist, userWatchlists, tickerArr}) => {


    console.log("USERWATHC", userWatchlists)
    return (
        <>

            {tickerArr.map(list =>(

                    <>

            <button className='notabutton' onClick={e => handleAddToWatchlist(e, list.id)} >Add To {list.name}</button>
                    </>
            ))}

        </>
    )
};

export default AddToWatchlist;
