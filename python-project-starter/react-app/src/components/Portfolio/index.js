import React, { useState, useEffect } from 'react';
import MyStonks from '../MyStonks';
import Watchlist from '../Watchlist';
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import portfolioReducer, { loadUserPortfolios } from '../../store/portfolio';
import { loadUserPortfolioValues } from '../../store/portfolioValues';
import { loadUserWatchlists } from '../../store/watchlists';

import PortfolioGraph from "../PortfolioGraph"


const Portfolio = () => {
    const dispatch = useDispatch();

    const [showStonks, setStonks] = useState(false)


    const watchlist = ['Watchlist 1', 'Watchlist 2', 'Watchlist 3']
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => state.portfolioReducer)
    const portfolioValues = useSelector(state => state.portfolioValuesReducer)
    const watchlists = useSelector(state => state.watchlistReducer)

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

    useEffect(() => {
        async function getWatchlists() {
            await dispatch(loadUserWatchlists(user.id))
        }
        getWatchlists()
    }, [])


    const hideTable = {
        display: 'none',
    }

    let portfolioTickers = Object.values(portfolios)
    let watchlistLists = Object.values(watchlists)

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
        <>
        <div>
            <PortfolioGraph dates={dateFormatArr} values={valueArr} />
        </div>

        <div className='accordion-container'>

            <button
                onClick={(e) => setStonks(!showStonks)}
                className={'accordion'}
            >
                My Stonks
            </button>

            {showStonks && <MyStonks portfolios={portfolios} />}

            {watchlistLists.map(list => (

                <div>
                    <Watchlist list={list}></Watchlist>
                </div>
            ))}







        </div >

        </>
        )

};

export default Portfolio;
