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

    return(
        <div className="search">
            <h1>Search for Stocks</h1>
            <form onSubmit={stockSearchSubmit} >
                <input type="text" name="tickerSearch" value={props.searchStock} onChange={stockSearchChange} />
                <input type="submit" name="submit" value="submit" />
            </form>
        </div>
    )
}

export default Search