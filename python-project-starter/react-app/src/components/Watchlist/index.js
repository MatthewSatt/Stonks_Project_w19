import React from 'react';
import '../MyStonks/index.css'

const Watchlist = () => {

    const data = [
        { ticker: "TSLA", price: 19 },
        { ticker: "NASQ", price: 19 },
        { ticker: "SNAP", price: 25 }
    ]

    return (
        <div className='my-stonks-table'>
            <table>
                <thead>
                    <tr>
                        <th>TICKR</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, key) => (
                        <tr key={key}>
                            <td>{val.ticker}</td>
                            <td> {val.price} </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>)
};

export default Watchlist;
