import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom'
// import { useDispatch } from "react-redux";
// import { loadWatchlistTickers, delWatchlistTicker } from '../../store/watchlistTickers';



const Tickers = ({ticker, handleDeleteTicker}) => {
    // const dispatch = useDispatch();
    const [showTicker, setShowTicker] = useState(true)

    // const handleDeleteTicker = (e, id) => {
    //     e.preventDefault()
    //     console.log("NEW TICKER IN COMPONENT", id)
    //     let tickerId = id
    //     dispatch(delWatchlistTicker(tickerId))
    //     // dispatch(loadWatchlistTickers(list.id))
    // }
    // useEffect(() => {
    //     async function getTickers() {
    //         await dispatch(loadWatchlistTickers(list.id))
    //     }
    //     getTickers()

    // }, [])



    return (
        <>
                {showTicker && (

                    <tr key={ticker.id}>
                            <td><Link id='linktostonk' to={`stonk/${ticker.ticker}`}>{ticker.ticker}</Link></td>
                            <td> {ticker.price} </td>
                           <td><button className='trash__btn' onClick={(e) => [handleDeleteTicker(e, ticker.id), setShowTicker(!showTicker)]}><FaTrashAlt className='trash'/></button></td>
                        </tr>
                        )}
        </>
    )
}

export default Tickers
