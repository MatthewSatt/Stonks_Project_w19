import React, { useEffect } from 'react';
import '../MyStonks/index.css'
import { useDispatch, useSelector } from "react-redux";
import { loadUserWatchlists } from '../../store/watchlists';

const Watchlist = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const watchlists = useSelector(state => state.watchlistReducer.watchlist)

    useEffect(() => {
        async function getWatchlists() {
            await dispatch(loadUserWatchlists(user.id))
        }
        getWatchlists()

    }, [dispatch])

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
