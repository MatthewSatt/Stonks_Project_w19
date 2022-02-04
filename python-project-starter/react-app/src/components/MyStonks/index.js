import React from 'react';
import './index.css'
const MyStonks = () => {


    const data = [
        { ticker: "GOOL", price: 19, quantity: 7 },
        { ticker: "APPL", price: 19, quantity: 3 },
        { ticker: "MSFT", price: 25, quantity: 200 },
    ]

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
                    {data.map((val, key) => (
                        <tr key={key}>
                            <td>{val.ticker}</td>
                            <td> {val.price} </td>
                            <td> {val.quantity} </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>)
};

export default MyStonks;
