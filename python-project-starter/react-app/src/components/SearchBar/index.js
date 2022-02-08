import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import "./searchBar.css"

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(async (e) =>{
        if (searchTerm === ""){
            return setSearchTerm("")
        }
        const res = await fetch(`/api/search`, {
	"method": "GET",
	"headers": {
		"Content-Type": "application/json"
	}
})
    const result = await res.json()


    const filteredResult = result.filter(word =>{
        return word[0].includes(searchTerm)
    })
    const filteredData = result[0][1]
    const finalResult = filteredResult.slice(0, 5)
    setSearchResults(finalResult)
    }, [searchTerm])



    console.log("FINAL RESULT", searchResults)
    return (
        <div className='search_container'>
        <div className="search__bar">
            <input type="text" value={searchTerm} placeholder="Search Stonks.." onChange={(e)=>setSearchTerm(e.target.value.toUpperCase())}></input>

        </div>
        <div id="search_results">
            {searchTerm && (
                <>
                {searchResults.map((result) => (
                    <>
                    <Link className="test" to={`/stonk/${result[0]}`}> {result} </Link>
                    </>
                    ))}
                </>
            )}
        </div>
        </div>
    )
}

export default SearchBar
