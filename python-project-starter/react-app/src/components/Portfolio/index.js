import React, { useState, useEffect } from 'react';
import MyStonks from '../MyStonks';
import Watchlist from '../Watchlist';
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import portfolioReducer, { loadUserPortfolios } from '../../store/portfolio';
import { loadUserPortfolioValues } from '../../store/portfolioValues';
import PortfolioGraph from "../PortfolioGraph"


const Portfolio = () => {
    const dispatch = useDispatch();

    const [showStonks, setStonks] = useState(false)
    const [showWatchlist, setWatchlist] = useState(false)

    const watchlist = ['Watchlist 1', 'Watchlist 2', 'Watchlist 3']
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => state.portfolioReducer)
    const portfolioValues = useSelector(state => state.portfolioValuesReducer)

    useEffect(() => {
        async function getPortfolios() {
            await dispatch(loadUserPortfolios(user.id))
        }
        getPortfolios()
    }, [setStonks])

    useEffect(() => {
        async function getPortfolioValues() {
            await dispatch(loadUserPortfolioValues(user.id))
        }
        getPortfolioValues()
    }, [setStonks])


    const hideTable = {
        display: 'none',
    }

    let portfolioTickers = Object.values(portfolios)

    let tickerArr = portfolioTickers.map(ticker => {
        return ticker["ticker"]
    })


//THIS PULLS FROM THE API TO GET THE TICKERS AND CURRENT VALUE FOR THEIR TICKERS
//WE MAY NOT NEED THIS USE EFFECT...POSSIBLY DELETE --comment by Will
// useEffect(() => {
    //     async function getValues() {
    //       const response = await fetch(`/api/stonk/user/${tickerArr}`);
    //       const values = await response.json();
    //       setUserTickersAndValues(values)
    //     }
    //     getValues()
    //   }, [stonkticker]);

    //   console.log("USER TICKER", userTickersAndValues)



    //The Below Code gets the days and values for the graph to render
    let valuesArr = Object.values(portfolioValues)

    let valueArr = valuesArr.map(value => {
        return value["value"]
    })

    let dateArr = valuesArr.map(value => {
        return value["date"]
    })

    let dateFormatArr = dateArr.map(date =>{
        let dstr = new Date(date).toLocaleDateString()
        return dstr
    })
    //End code needed for the graph

    return (
        <div className='home-page'>
            <div className='leftside'>
                <button
                    onClick={(e) => setStonks(!showStonks)}
                    className="portfolioleft"
                >
                    My Stonks
                </button>

                {showStonks && <MyStonks portfolios={portfolios} />}
            </div>
        <div className='middleside-content'>
            <div>
                <h1>Welcome {user.username}</h1>
            </div>
            <div className='middleside'>
                <h2>Balance Over Time</h2>
                <PortfolioGraph dates={dateFormatArr} values={valueArr} />
            </div>
        </div>

        <div className='rightside'>


            {watchlist.map((list, i) => (

                <button
                    onClick={(e) => setWatchlist(!showWatchlist)}
                    className="watchlistright"
                >
                    {list}
                </button>


))}

            {showWatchlist && <Watchlist />}


        </div >

        </div>
        )

};

export default Portfolio;


