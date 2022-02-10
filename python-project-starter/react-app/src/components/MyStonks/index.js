import React from 'react';
import {Link} from 'react-router-dom'
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
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {stocksArr.map((stock) => (
                        <tr key="TEST">
                            <td><Link id='linktostonk' to={`stonk/${stock.ticker}`}>{stock.ticker}</Link></td>
                            <td> {stock["current_price"]} </td>
                            <td> {stock.quantity} </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>)
};

export default MyStonks;
