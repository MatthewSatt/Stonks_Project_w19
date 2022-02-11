import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { editStonk, getStockDetails, sellStonk, buyStonk } from '../../store/stockDetails';
import { loadUserPortfolios } from '../../store/portfolio';
import { addWatchlistTicker } from '../../store/watchlistTickers';
import StockGraph from "../StockGraph"
import "./index.css"

const StockDetail = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const ticker = useParams()
    const ref = useRef()
    const thisTicker = useParams()
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => state.portfolioReducer)
    const [showAddButton, setShowAddButton] = useState(true)


    const [cost, setCost] = useState(0)


    //Stock Details is an object with all of the information we need for the detail page
    const stockDetails = useSelector(state => state.stockDetailReducer.stockDetail);

    useEffect(() => {
        async function getDetails() {
            await dispatch(getStockDetails(ticker.ticker))
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
        let ticker_filter = portfolioValues.filter(item =>{
            if (item.ticker === ticker.ticker){
                return item
            }
        })

        console.log("TICKER FILTER", ticker_filter)
        if (ticker_filter.length){
            await dispatch(editStonk(ticker_filter, ref.current.value))
            history.push("/home")
        }

        if (!ticker_filter.length){
                await dispatch(buyStonk(ticker.ticker, ref.current.value, price, user.id))
                history.push("/home")
            }
        }



    const handleSell = async (e) => {
        e.preventDefault()
        const portfolioValues = Object.values(user.portfolio)
        let ticker_filter = portfolioValues.filter(item =>{
            if (item.ticker === ticker.ticker){
                return item
            }
        })
        let currentQuantity = ticker_filter[0]['quantity']

        if(!(currentQuantity - ref.current.value === 0)){
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

    const handleAddToWatchlist = async (e) =>{
        e.preventDefault();
        const ticker = thisTicker.ticker
        let watchlistId = 1
        await dispatch(addWatchlistTicker(ticker, watchlistId))
        setShowAddButton(!showAddButton)

    }


    const tickerArr = []
    let forEach = user.watchlists.forEach(list =>{
         tickerArr.push(...list.watchlist_tickers)
    })

    let containsTicker = tickerArr.filter(tick =>{
        return tick.ticker === thisTicker.ticker
    })

    let dates = stockDetails["dates"]
    let values = stockDetails["values"]

    let price = stockDetails["price"]
    let name = stockDetails["name"]
    let about = stockDetails["about"]
    let employees = stockDetails["employees"]
    let city = stockDetails["city"]
    let state = stockDetails["state"]
    let sector = stockDetails["sector"]
    let volume = stockDetails["volume"]
    let avgVolume = stockDetails["avgvolume"]
    let marketcap = stockDetails["marketcap"]
    let peRatio = stockDetails["peratio"]
    let divYield = stockDetails["divyield"]
    let yearHigh = stockDetails["52high"]
    let yearLow = stockDetails["52low"]

    return (
        <div className='container'>
            <div className='Order66'>
                <button id='buybutton' onClick={handleBuy}>Buy</button>
                <span id='buyprice'>$ {cost}</span>
                <input placeholder='quantity' onChange={e => setCost((e.target.value * price))} type='number' min='0' ref={ref} />
                <span id='sellprice'>-$ {cost}</span>
                <button onClick={handleSell} id='sellbutton'>Sell</button>
            </div>
            <div className='graph-title'>
                <h1 id='title'>{name}</h1>
                <div className="stock__detail__graph">
                    <StockGraph dates={dates} values={values}/>
                </div>
            </div>
            <h2>Key Stats</h2>
            {!containsTicker.length && showAddButton && (
                <button className='notabutton' onClick={handleAddToWatchlist}>Add To Watchlist</button>
            )}
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
        </div>
    )
};

export default StockDetail;
