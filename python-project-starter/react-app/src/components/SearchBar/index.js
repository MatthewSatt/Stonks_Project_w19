import React, { useEffect, useState } from 'react';
import "./searchBar.css"

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState();

    useEffect(() =>{
        // const filteredData = cryptoLsit?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        console.log(searchTerm)
    }, [searchTerm])

    return (
        <div className="search__bar">
            <input type="text" placeholder="Search Stonks.." onChange={(e)=>setSearchTerm(e.target.value)}></input>
            
        </div>
    )
}

export default SearchBar
