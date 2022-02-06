import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getStockDetails } from '../../store/stockDetails';

const StockDetail = () => {
    const dispatch = useDispatch();
    const ticker = useParams()

    const user = useSelector(state => state.session.user)
    const stockDetails = useSelector(state => state.stockDetailReducer.stockDetail);

    useEffect(() => {
        console.log("TICKER")
        async function getDetails() {
            await dispatch(getStockDetails(ticker.ticker))
        }
        getDetails()
        console.log("TICKER2")

    }, [dispatch, ticker])

    // if(!stockDetails){
    //     return null
    // }

    console.log(stockDetails)
    return (
        <div className='container'>
            <h1> Graph </h1>
            <h1>Right Menu</h1>
            <h1>About Company</h1>
            <h1>Key Stats</h1>
        </div>
    )
};

export default StockDetail;
