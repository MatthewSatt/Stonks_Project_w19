import React from 'react';
import './index.css'
const MyStonks = ({portfolios}) => {



    // console.log("PORT", portfolios)
    let stocksArr = Object.values(portfolios)
    console.log("PORTttttttttttttt", stocksArr)
    return (
        <div className='my-stonks-table'>
            <table>
                <thead>
                    <tr>
                        <th>TICKR</th>
                        <th>Price</th>
                        <th>Quanittity</th>
                    </tr>
                </thead>
                <tbody>
                    {stocksArr.map((stock) => (
                        <tr key="TEST">
                            <td>{stock.ticker}</td>
                            <td> {stock["current_price"]} </td>
                            <td> {stock.quantity} </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>)
};

export default MyStonks;
