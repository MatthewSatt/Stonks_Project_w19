import React, { useState, useEffect } from 'react';
import MyStonks from '../MyStonks';
import Watchlist from '../Watchlist';
import './index.css'
import { useDispatch, useSelector } from "react-redux";
// import portfolioReducer, { loadUserPortfolios } from '../../store/portfolio';
// import { loadUserPortfolioValues } from '../../store/portfolioValues';
import { addWatchlist, loadUserWatchlists } from '../../store/watchlists';
import { setUser } from '../../store/session'
import { delWatchlistTicker } from '../../store/watchlistTickers';

import { FaPlus } from "react-icons/fa";


import PortfolioGraph from "../PortfolioGraph"


const Portfolio = () => {
    const dispatch = useDispatch();

    // const [showStonks, setStonks] = useState(false)
    const [showWatchlists, setShowWatchlists] = useState(false)
    const [watchlistName, setWatchlistName] = useState("")
    const [showForm, setShowForm] = useState(false)


    const user = useSelector(state => state.session.user)
    // const portfolios = useSelector(state => state.portfolioReducer)
    // const portfolioValues = useSelector(state => state.portfolioValuesReducer)
    const watchlists = useSelector(state => state.watchlistReducer)

    useEffect(() => {
        async function getUserUpdates()  {
          const response = await fetch(`/api/users/${user.id}`);
          const updatedUser = await response.json();
          await dispatch(setUser(updatedUser))
      }
      getUserUpdates()
    }, []);

    // useEffect(() => {
    //     async function getPortfolios() {
    //         await dispatch(loadUserPortfolios(user.id))
    //     }
    //     getPortfolios()
    // }, [setStonks])

    // useEffect(() => {
    //     async function getPortfolioValues() {
    //         await dispatch(loadUserPortfolioValues(user.id))
    //     }
    //     getPortfolioValues()
    // }, [setStonks])

    useEffect(() => {
        async function getWatchlists() {
            await dispatch(loadUserWatchlists(user.id))
        }
        getWatchlists()
    }, [dispatch])






    const handleWatchListSubmit = (e) =>{
        e.preventDefault();
        const newName = watchlistName
        let user_id = user.id
        dispatch(addWatchlist(newName, user_id))
        setWatchlistName("")
        setShowForm(!showForm)
        // dispatch(loadWatchlistTickers(list.id))
        // dispatch(loadUserWatchlists(user.id))
    }


    const hideTable = {
        display: 'none',
    }

    // let portfolioTickers = Object.values(user.portfolio)
    let watchlistLists = Object.values(user.watchlists)

    // let tickerArr = portfolioTickers.map(ticker => {
    //     return ticker["ticker"]
    // })


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
    const handleDeleteTicker = async (e, id) => {
        e.preventDefault()
        let tickerId = id
        await dispatch(delWatchlistTicker(tickerId))
        // dispatch(loadWatchlistTickers(list.id))
    }


    //The Below Code gets the days and values for the graph to render
    let valuesArr = Object.values(user.portfolio_value)

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
    // console.log(user.watchlists)
    return (
        <div className='home-page'>
            <div className='leftside'>
                <div className='mystonksport'>
                <h2 id='portheader'>Portfolio</h2>
                    {<MyStonks portfolios={user.portfolio} />}

                </div>
            </div>
        <div className='middleside-content'>
            <div >
                <h1 className='welcome__msg'>Welcome {user.username}</h1>
            </div>
            <div className='middleside'>
                <h2 id='graphheader'>Balance Over Time</h2>
                <PortfolioGraph dates={dateFormatArr} values={valueArr} />
            </div>
            <div className='new__container'>
                <h1>News</h1>
                <div className='news__content'>
                    <img src="https://g.foolcdn.com/editorial/images/604040/rising-stock-price.jpg" alt="Your picture" className='news__image'/>
                    <div className='article__container'>
                        <p className='news__heading'>This is a heading</p>
                        <p className='news__article'>This is some story about blah blah blah blah</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='rightside'>









            <div className='watchlistright'>
                <button className='my__watchlists__btn' onClick={(e) => setShowWatchlists(!showWatchlists)}>
                    <h2>Show My Watchlists</h2>
                </button>
                {showWatchlists && (
                    <>
                    {watchlistLists.map(list => (

                        <div className='eachwatchlist'>
                        <Watchlist key={list.id} handleDeleteTicker={handleDeleteTicker} list={list}></Watchlist>
                    </div>
                ))}
                </>
                )}
                <button className='add__watchlist__btn' onClick={(e) => setShowForm(!showForm)}><FaPlus className='add__new__watchlist'/></button>
                {showForm && (
                    <form onSubmit={handleWatchListSubmit}>
                    <div className='add__list__container'>
                        <input
                        className='add__watchlist__input'
                        name="Watchlist"
                        placeholder='Watchlist Name..'
                        value={watchlistName}
                        onChange={e => setWatchlistName(e.target.value)}
                        >
                        </input>
                        <button className='submit__watchlist__btn' type="submit">Submit</button>
                    </div>
                </form>
                )}
            </div>

        </div >

        </div>
        )

};

export default Portfolio;
