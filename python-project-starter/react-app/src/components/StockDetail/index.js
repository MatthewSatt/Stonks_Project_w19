import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getStockDetails } from '../../store/stockDetails';
import StockGraph from "../StockGraph"
import "./index.css"

const StockDetail = () => {
    const dispatch = useDispatch();
    const ticker = useParams()

    const user = useSelector(state => state.session.user)

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
        console.log(cost)
    }, [cost])


    if(!stockDetails){
        return null
    }


    console.log(stockDetails)

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
                <button id='buybutton'>Buy</button>
                <span id='buyprice'>$ {cost}</span>
                <input placeholder='quantity' onChange={e => setCost((e.target.value * price))} type='number' min='0'/>
                <span id='sellprice'>-$ {cost}</span>
                <button id='sellbutton'>Sell</button>
            </div>
            <div className='graph-title'>
                <h1 id='title'>{name}</h1>
                <div>
                    <StockGraph dates={dates} values={values}/>
                </div>
            </div>
                <h2>Key Stats</h2>
            <button className='notabutton'>Add To Watchlist</button>
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
