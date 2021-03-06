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
import { FaAngleDown, FaAngleUp, FaChartLine, FaGithub } from 'react-icons/fa';
import { FaPlus, FaYoutubeSquare } from "react-icons/fa";


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
        async function getUserUpdates() {
            const response = await fetch(`/api/users/${user.id}`);
            const updatedUser = await response.json();
            await dispatch(setUser(updatedUser))
        }
        getUserUpdates()
    }, [dispatch]);


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
    const handleDeleteTicker = async (e, id) => {
        e.preventDefault()
        let tickerId = id
        await dispatch(delWatchlistTicker(tickerId))
        await dispatch(loadUserWatchlists(user.id))
        // dispatch(loadWatchlistTickers(list.id))
    }

    useEffect(() => {
        async function getWatchlists() {
            await dispatch(loadUserWatchlists(user.id))
        }
        getWatchlists()
    }, [dispatch])






    const handleWatchListSubmit = (e) => {
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
    // let watchlistLists = Object.values(user.watchlists)
    let watchlistLists = Object.values(watchlists)
    // console.log("WATCHLISTSSS", watchlistLists)
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


    const GraphStyle = {
        width: '100%'
    }

    const watchlistStyle = {
        width: '80%'
    }

    //The Below Code gets the days and values for the graph to render
    let valuesArr = Object.values(user.portfolio_value)

    let valueArr = valuesArr.map(value => {
        return value["value"]
    })

    let dateArr = valuesArr.map(value => {
        return value["date"]
    })

    let dateFormatArr = dateArr.map(date => {
        let dstr = new Date(date).toLocaleDateString()
        return dstr
    })
    //End code needed for the graph
    // console.log(user.watchlists)
    return (
        <>
        <div className='home-page'>
            <div className='left-container'>
                <div className='left-content'>
                    <h2 id='portheader'>Portfolio Value: ${user.value_of_holdings.toFixed(2)}</h2>
                    {<MyStonks portfolios={user.portfolio} style={watchlistStyle}/>}

                </div>
            </div>
            <div className='middle-container'>
                <div >
                    <h1 className='welcome__msg'>Welcome {user.username}</h1>
                </div>
                <div className='middle-content'>
                    <h2 id='graphheader'>Total Value: ${(user.value_of_holdings + user.cash).toFixed(2)}</h2>
                    <PortfolioGraph dates={dateFormatArr} values={valueArr} style={GraphStyle} />

                </div>
            </div>

            <div className='right-container'>
                <div className='right-content'>
                    <button className='my__watchlists__btn' onClick={(e) => setShowWatchlists(!showWatchlists)}>
                        <h2>Watchlists<span>< FaAngleDown/></span></h2>
                    </button>
                    {showWatchlists && (
                        <>
                            {watchlistLists.map(list => (

                                <div className='indv-watch'>
                                    <Watchlist handleDeleteTicker={handleDeleteTicker} list={list} style={watchlistStyle}></Watchlist>
                                </div>
                            ))}
                        </>
                    )}
                    <button className='add__watchlist__btn' onClick={(e) => setShowForm(!showForm)}><FaPlus className='add__new__watchlist' /></button>
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
        </div >
                    <div className='news__container'>
                        <div className='news__title'><h1>News</h1></div>
                        <div className='news__content'>
                            <a href='https://github.com/MatthewSatt/Stonks_Project_w19/graphs/contributors' target='_blank'><img src="https://mediacloud.kiplinger.com/image/private/s--guAmUFz8--/f_auto,t_primary-image-mobile@1/v1640725281/Investing/stock-market-today-122821.jpg" alt="Your picture" className='news__image' /></a>
                            <div className='article__container'>
                                <p className='news__heading'>BEST NEW STOCK APP</p>
                                <p className='news__article'>The Stonks: find out more about our team...</p>
                            </div>


                        </div>
                        <div className='news__content'>
                            <a href='https://finance.yahoo.com/news/wall-street-week-ahead-earnings-072340060.html' target='_blank'><img src="https://images.moneycontrol.com/static-mcnews/2022/02/stocks_sensex_nifty_stockmarket.jpg" alt="Your picture" className='news__image' /></a>
                            <div className='article__container'>
                                <p className='news__heading'>Latest Wall Street Earnings</p>
                                <p className='news__article'>Investors will focus on December quarter earnings...</p>
                            </div>
                        </div>
                        <div className='news__content'>
                            <a href='https://finance.yahoo.com/news/not-imagining-markets-really-thinner-155000048.html' target='_blank'><img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/7325/production/_111277492_gettyimages-1207339125.jpg" alt="Your picture" className='news__image' /></a>
                            <div className='article__container'>
                                <p className='news__heading'>The Do's and Do not's of Investing</p>
                                <p className='news__article'>The game of Investing, it's a game you dont want to lose...</p>
                            </div>
                        </div>
                    </div>
                    </>
    )

};

export default Portfolio;
