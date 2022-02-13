import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { editStonk, getStockDetails, sellStonk, buyStonk } from '../../store/stockDetails';
import { loadUserPortfolios } from '../../store/portfolio';
import { addWatchlistTicker } from '../../store/watchlistTickers';
import StockGraph from "../StockGraph"
import "./index.css"
import AddToWatchlist from './addToWatchlist'
import { loadUserWatchlists } from '../../store/watchlists';


const StockDetail = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const ticker = useParams()
    const ref = useRef()
    const thisTicker = useParams()
    const user = useSelector(state => state.session.user)
    // const tickerReducer = useSelector(state => state.watchlistTickerReducer)
    const [showAddButton, setShowAddButton] = useState(false)
    const [tickerExists, setTickerExists] = useState(true)
    const watchlists = useSelector(state => state.watchlistReducer)

    useEffect(() => {
        async function getWatchlists() {
            await dispatch(loadUserWatchlists(user.id))
        }
        getWatchlists()
    }, [dispatch])

    const [cost, setCost] = useState(0)

    const Graph2Style = {
        width: '80%'
    }

    //Stock Details is an object with all of the information we need for the detail page
    const stockDetails = useSelector(state => state.stockDetailReducer.stockDetail);

    useEffect(() => {
        async function getDetails() {
            await dispatch(getStockDetails(ticker.ticker))
            const tickerArr = []
            if(user.watchlists.length === 0) {
                return
            }
            let forEach = user.watchlists.forEach(list => {
                tickerArr.push(...list.watchlist_tickers)

            })

            let containsTicker = tickerArr.filter(tick => {
                return tick.ticker === thisTicker.ticker
            })
            await setTickerExists(containsTicker.length === 0)

            // if (containsTicker.length === 0){
            //     await setShowAddButton(!showAddButton)
            // }
        }
        getDetails()

    }, [dispatch, ticker])

    useEffect(() => {
        async function getPortfolios() {
            await dispatch(loadUserPortfolios(user.id))
        }
        getPortfolios()
    }, [dispatch])


    const handleBuy = async (e) => {
        // const tickernum = parseInt(ticker.ticker, 10)
        e.preventDefault()

        const portfolioValues = Object.values(user.portfolio)
        let ticker_filter = portfolioValues.filter(item => {
            if (item.ticker === ticker.ticker) {
                return item
            }
        })

        const costToBuy = (ref.current.value * price)

        if(user.cash < costToBuy){
            window.alert("You need more cash in your balance to complete this buy.")
            return
        }

        if (ticker_filter.length){

            await dispatch(editStonk(ticker_filter, ref.current.value))
            history.push("/home")
        }

        if (!ticker_filter.length) {
            await dispatch(buyStonk(ticker.ticker, ref.current.value, price, user.id))
            history.push("/home")
        }
    }



    const handleSell = async (e) => {
        e.preventDefault()
        const portfolioValues = Object.values(user.portfolio)
        let ticker_filter = portfolioValues.filter(item => {
            if (item.ticker === ticker.ticker) {
                return item
            }
        })
        if(ticker_filter.length === 0){
            window.alert("You can't sell a stock you do not own")
            return
        }
        // console.log("TICKERRR", ticker_filter[0][])
        if(ticker_filter[0]["quantity"] < ref.current.value){
            window.alert("You can't sell more shares than you own")
            return
        }
        let currentQuantity = ticker_filter[0]['quantity']

        if (!(currentQuantity - ref.current.value === 0)) {
            await dispatch(editStonk(ticker_filter, (ref.current.value * -1)))
            // history.push("/home")
        }



        if(currentQuantity - ref.current.value === 0){


            await dispatch(sellStonk(ticker_filter, (ref.current.value * -1)))
            // history.push("/home")
        }
        history.push("/home")

    }

    if (!stockDetails) {
        return null
    }

    const handleAddToWatchlist = async (e, listId) => {
        e.preventDefault();
        const ticker = thisTicker.ticker

        let lists = Object.values(user.watchlists)

        let tickerArr = []
        lists.forEach(list =>{
            tickerArr.push(...list.watchlist_tickers)
        })

        console.log("TICKER ARR", tickerArr)
        // tickerArr.forEach(tick =>{
        //     if (tick.ticker === ticker){
        //     window.alert(`This watchlist already has ${tick.ticker}`)
        //         return
        //     }
        // })
        let watchlistId = listId
        let tickFilter = tickerArr.filter(tick =>{
            if (tick.watchlist_id === watchlistId  && tick.ticker === ticker){
               return (tick.watchlistId, tick.ticker)
            }
        })
        console.log("tickFIlTERR", tickFilter)

        if (tickFilter.length){
            return window.alert(`This watchlist already contains ${ticker}`)
        }

        // let validatorTicker = Object.values(tickerReducer)
        // let validatorFilter = validatorTicker.filter(tick =>{
        //     if (tick.watchlist_id === watchlistId  && tick.ticker === ticker){
        //        return (tick.watchlistId, tick.ticker)
        //     }
        // })

        // console.log("TICKER REDUCE", Object.values(validatorTicker))

        // if (validatorFilter.length){
        //     return window.alert(`This watchlist already contains ${ticker}`)
        // }
        let id = user.id
        console.log("IN TICKER", watchlistId, ticker, id)
        await dispatch(addWatchlistTicker(ticker, watchlistId, id))
        setShowAddButton(!showAddButton)

    }

    const showUsersWatchlists = async (e) => {
        e.preventDefault();
        setShowAddButton(!showAddButton)

    }



    let watchlistLists = Object.values(watchlists)

    const tickerArr = []

    let forEach = watchlistLists.forEach(list => {
        tickerArr.push(list)

    })

    // let forEach = watchlists.forEach(list => {
    //     tickerArr.push(list)

    // })

    let containsTicker = tickerArr.filter(tick => {
        return tick.ticker === thisTicker.ticker
    })

//     useEffect(() =>{

//         let validator = []
//         user.watchlists.forEach(list => {
//             let filter = list.watchlist_tickers.filter(tick =>{
//             return tick.ticker === ticker
//         })
//         validator.push(filter.length)
//     })
//     console.log("TICKERARRR", validator)
//     let result = validator.every(function (e) {
//         return e === 0
//     }
//     )
//     console.log("RESULT", result)
// }, [handleAddToWatchlist])


    let dates = stockDetails["dates"]
    let values = stockDetails["values"]

    let price = stockDetails["price"]
    let name = stockDetails["name"]
    // let about = stockDetails["about"]
    // let employees = stockDetails["employees"]
    // let city = stockDetails["city"]
    // let state = stockDetails["state"]
    let sector = stockDetails["sector"]
    // let volume = stockDetails["volume"]
    // let avgVolume = stockDetails["avgvolume"]
    let marketcap = stockDetails["marketcap"]
    let peRatio = stockDetails["peratio"]
    let divYield = stockDetails["divyield"]
    let yearHigh = stockDetails["52high"]
    let yearLow = stockDetails["52low"]
    return (

        <div className='stock-detail-container'>
            <h1 id='title'>{name}</h1>
            <div className='Order66'>
                <button onClick={handleBuy} class="button-82-pushable2" role="button">
                    <span class="button-82-shadow2"></span>
                    <span class="button-82-edge2"></span>
                    <span class="button-82-front2 text">
                        Buy
                    </span>
                </button>
                {/* <button id='buybutton' onClick={handleBuy}>Buy</button> */}
                <span id='buyprice'>$ {cost}</span>
                <input placeholder='quantity' onChange={e => setCost((e.target.value * price))} type='number' min='0' ref={ref} />
                <span id='sellprice'>-$ {cost}</span>
                {/* <button onClick={handleSell} id='sellbutton'>Sell</button> */}
                <button onClick={handleSell} class="button-82-pushable" role="button">
                    <span class="button-82-shadow"></span>
                    <span class="button-82-edge"></span>
                    <span class="button-82-front text">
                        Sell
                    </span>
                </button>
            </div>

            <div className='graph-title'>
                <div className="stock__detail__graph">
                    <StockGraph dates={dates} values={values} style={Graph2Style} />
                </div>
            </div>

            <h2>Key Stats</h2>
            <div className='all-kpi'>
                <div className='kpi'><p>Name:</p> {name}</div>
                <div className='kpi'><p>Price:</p> {price}</div>
                <div className='kpi'><p>Market Cap:</p> {marketcap}</div>
                <div className='kpi'><p>P/E Ratio</p> {peRatio}</div>
                <div className='kpi'><p>Dividend Yield:</p> {divYield}</div>
                <div className='kpi'><p>52-week High:</p> {yearHigh}</div>
                <div className='kpi'><p>52-week Low</p> {yearLow}</div>
                <div className='kpi'><p>Sector:</p> {sector}</div>
            </div>


            {/* <button className='add-to-list' onClick={showUsersWatchlists}>Show Watchlists</button> */}
            <button onClick={showUsersWatchlists} class="button-82-pushable3" role="button">
                    <span class="button-82-shadow3"></span>
                    <span class="button-82-edge3"></span>
                    <span id="addToWatchlist-btn" class="button-82-front3 text">
                    Show Watchlists
                    </span>
                </button>
                {showAddButton && (
                    <AddToWatchlist tickerArr={tickerArr} tickerExists={tickerExists} handleAddToWatchlist={handleAddToWatchlist} />
                    )}
        </div>

    )
};

export default StockDetail;
