import { useEffect } from 'react'
import '../views/Search.css'

const Search = (props) => {

    const stockSearchChange = (evt) => {
        props.setSearchStock(
            [evt.target.name] = evt.target.value      
        )
    }

    const stockSearchSubmit = (evt) => {
        evt.preventDefault()
        props.history.push(`/stock/${props.searchStock}`)
    }

    useEffect(()=> {
        //rerun if the use returns to this page before hitting the watchlist
        //this allows confirmation on whether it has been added to watchlist
        props.createWatchlist()
    },[])

    
    return(
        <div className="search">
            <h1>Search for Stocks</h1>
            <form className="stockSearchForm" onSubmit={stockSearchSubmit} >
                <p>Symbol:</p>
                <input type="text" name="tickerSearch" value={props.searchStock} onChange={stockSearchChange} />
                <input type="submit" name="submit" value="Search" />
            </form>
        </div>
    )
}

export default Search