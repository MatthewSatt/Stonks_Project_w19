import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import "./searchBar.css"

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() =>{
        setSearchTerm("")
    },[])

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
        return (word[0].includes(searchTerm.toUpperCase()) || word[1].toUpperCase().includes(searchTerm.toUpperCase()))
    })

    const finalResult = filteredResult.slice(0, 5)
    setSearchResults(finalResult)
    }, [searchTerm])



    return (
        <div className='search_container'>
        <div className="search__bar">
            <input type="text" value={searchTerm} placeholder="Search Stonks.." onChange={(e)=>setSearchTerm(e.target.value)}></input>

        </div>
        <div id="search_results">
            {searchTerm && (
                <>
                {searchResults.map((result) => (
                    <>
                    <Link onClick={() => setSearchTerm("")} className="test" to={`/stonk/${result[0]}`}> {result[0]} - {result[1]} </Link>
                    </>
                    ))}
                </>
            )}
        </div>
        </div>
    )
}

export default SearchBar
