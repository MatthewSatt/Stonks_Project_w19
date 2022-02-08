import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import "./searchBar.css"

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(async (e) =>{
        const res = await fetch(`/api/search`, {
	"method": "GET",
	"headers": {
		"Content-Type": "application/json"
	}
})
    const result = await res.json()
    console.log("RESULT IN COMPONENT", result)
    const filteredResult = result.filter(word =>{
        return word[0].includes(searchTerm)
    })
    const filteredData = result[0][1]
    const finalResult = filteredResult.slice(0, 5)
    setSearchResults(finalResult)
        // )=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [searchTerm])

    console.log("FINAL RESULT", searchResults)
    return (
        <>
        <div className="search__bar">
            <input type="text" placeholder="Search Stonks.." onChange={(e)=>setSearchTerm(e.target.value)}></input>

        </div>
        <div>
            {searchResults.map((result) => (
                <Link to={`/stonk/${result[0]}`}> {result} </Link>
            ))}
        </div>
        </>
    )
}

export default SearchBar
