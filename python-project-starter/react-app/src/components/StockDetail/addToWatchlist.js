import React from 'react'

import "./index.css"

const AddToWatchlist = ({handleAddToWatchlist, tickerArr}) => {

    return (
        <>
            {tickerArr.map(list =>(
                    <>
            <button key={list.id} className='add-to-list-ticker' onClick={e => handleAddToWatchlist(e, list.id)} >Add To {list.name}</button>
                    </>
            ))}
        </>
    )
};

export default AddToWatchlist;
