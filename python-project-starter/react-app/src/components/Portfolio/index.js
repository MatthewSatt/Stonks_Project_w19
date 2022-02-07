import React, { useState, useEffect } from 'react';
import MyStonks from '../MyStonks';
import Watchlist from '../Watchlist';
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { loadUserPortfolios } from '../../store/portfolio';
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
    }, [setWatchlist])

    useEffect(() => {
        async function getPortfolioValues() {
            await dispatch(loadUserPortfolioValues(user.id))
        }
        getPortfolioValues()
    }, [setWatchlist])


    const hideTable = {
        display: 'none',
    }
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


        </div >

        </>
        )

};

export default Portfolio;
