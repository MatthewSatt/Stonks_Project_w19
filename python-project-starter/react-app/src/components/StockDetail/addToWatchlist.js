import React from 'react'

import "./index.css"

const AddToWatchlist = ({handleAddToWatchlist, tickerArr}) => {

    return (
        <>
            {tickerArr.map(list =>(
                    <>
            <button key={list.id} className='notabutton' onClick={e => handleAddToWatchlist(e, list.id)} >Add To {list.name}</button>
                    </>
            ))}
        </>
    )
};

export default AddToWatchlist;
