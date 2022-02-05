import React, { useEffect } from 'react';

const StockDetail = () => {
    const ticker = useParams()

    const stockDetails = useSelector(state => state.stock.currentStock);


    useEffect(() => {
        dispatchEvent(stockDetailReducer.getStockDetails(ticker))
    }, [dispatch, ticker])

    if(!stockDetails){
        return null
    }

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
