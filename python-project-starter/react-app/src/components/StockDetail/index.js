import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getStockDetails } from '../../store/stockDetails';
import StockGraph from "../StockGraph"

const StockDetail = () => {
    const dispatch = useDispatch();
    const ticker = useParams()

    const user = useSelector(state => state.session.user)

    //Stock Details is an object with all of the information we need for the detail page
    const stockDetails = useSelector(state => state.stockDetailReducer.stockDetail);

    useEffect(() => {
        async function getDetails() {
            await dispatch(getStockDetails(ticker.ticker))
        }
        getDetails()

    }, [dispatch, ticker])

    if(!stockDetails){
        return null
    }

    console.log(stockDetails)

    let dates = stockDetails["dates"]
    let values = stockDetails["values"]

    return (
        <div className='container'>
            <h1> Graph </h1>
            <h1>Right Menu</h1>
            <h1>About Company</h1>
            <h1>Key Stats</h1>
            <div>
                <StockGraph dates={dates} values={values}/>
            </div>
        </div>
    )
};

export default StockDetail;
