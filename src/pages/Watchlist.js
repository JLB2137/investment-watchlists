import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../views/Watchlist.css'

const Watchlist = (props) => {

    const [watchlistRename,setWatchlistRename] = useState(null)

    const watchlistNameChangeInput = (evt) => {
        setWatchlistRename(
            [evt.target.name] = evt.target.value      
        )
    }

    //update the stored variable on the DB to reflect the new
    //watchlist name and reset the state for the title
    const watchlistNameChangeSubmit = async (evt) => {
        evt.preventDefault()
        if (props.watchlistName === null) {
            //if a new name hasn't been created add it using post
            await fetch(`https://investment-watchlists-backend.herokuapp.com/watchlistNaming/${props.user.uid}`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                user: props.user.uid,
                watchlistName: watchlistRename
            })
        })
            console.log("props.watchlistNaming()",props.watchlistNaming())
            //rerun the data to update based on the new post and
            //saved watchlist name
            props.watchlistNaming()
        } else {
            await fetch(`https://investment-watchlists-backend.herokuapp.com/watchlistNaming/rename/${props.watchlistNameID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    user: props.user.uid,
                    watchlistName: watchlistRename
                })
            })
        }
        props.setWatchlistName(watchlistRename)
    }

    useEffect(()=> {
        props.createWatchlist()
    },[])



    const loaded = () => {
        const listOfStocks = props.stockList.map((stock) => {
            return(
                <div className='watchlistStock'>
                    <Link to={`/stock/${stock.symbol}`}>
                        <h5>{stock.symbol}</h5>
                    </Link>
                    <p>{stock.longName}</p>
                    <p>Quote Source: {stock.quoteSourceName}</p>
                    <p>Price: ${stock.regularMarketPrice}</p>
                    <p>Daily Percent Change: {stock.regularMarketChangePercent}%</p>
                    <p>Daily Volume: {stock.regularMarketVolume} Orders</p>
                    <button onClick={()=> props.removeFromWatchlist(stock.MONGO_ID,stock.symbol) }>Remove {stock.symbol} from {props.watchlistName}</button>
                </div>
            )
        })
        return(
            <div className='watchlist'>
                <div className="watchlistName">
                    {props.watchlistName ?
                        <h1>{props.watchlistName}</h1>
                        :
                        <h1>Watchlist</h1>
                    }
                </div>
                <div className='watchlistUpdate'>
                    <form className='watchlistUpdate' onSubmit={watchlistNameChangeSubmit}>
                        <p>Update Watchlist Name:</p>
                        <input type="text" name="watchlistInput" value={watchlistRename} onChange={watchlistNameChangeInput} />
                        <input type="submit" name="renameSubmit" value="Update" />
                    </form>
                </div>
                <div className='listOfStocks'>
                    {listOfStocks}
                </div>
            </div>
        )
    }

    const loading = () => {
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <div>
            {
                props.ready ?
                loaded()
                :
                loading() 
            }
        </div>
    )
}

export default Watchlist