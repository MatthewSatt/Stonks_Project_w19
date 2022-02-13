import React from 'react'

import "./index.css"

const AddToWatchlist = ({handleAddToWatchlist, tickerArr}) => {


    return (
        <div className='add-to-list-container'>

                {tickerArr.map(list =>(
                    <>
                    <button key={list.id} className='add-to-list-ticker' onClick={e => handleAddToWatchlist(e, list.id)} class="button-82-pushable4" role="button">
                        <span class="button-82-shadow4"></span>
                        <span class="button-82-edge4"></span>
                        <span id="addToWatchlist-btns" class="button-82-front4 text">
                            Add To {list.name}
                        </span>
                    </button>
                    {/* <button key={list.id} className='add-to-list-ticker' onClick={e => handleAddToWatchlist(e, list.id)} >Add To {list.name}</button> */}
                </>
            ))}
        </div>
    )
};

export default AddToWatchlist;
