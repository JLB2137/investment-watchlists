import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

const Watchlist = (props) => {

    const [stockList, setStockList] = useState([])
    const [ready, setReady] = useState(null)
    const [watchlistRename,setWatchlistRename] = useState(null)

    const removeSymbolFromState = (ticker) => {
        let newSet = []
        stockList.map((stock)=> {
            if (stock.symbol !== ticker && newSet.length >= 1) {
                newSet.push(stock)
            } else if (stock.symbol !== ticker && newSet.length <= 1) {
                newSet = [stock]
            }
        })
        setStockList(newSet)
    }


    const removeFromWatchlist = async (tickerID,symbol) => {
        setReady(null)
        await fetch(`http://localhost:3001/post/${tickerID}`, {
            method: "DELETE"
        })
        removeSymbolFromState(symbol)
        setReady(true)
    }

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
            await fetch(`http://localhost:3001/watchlistNaming/${props.user.uid}`, {
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
            await fetch(`http://localhost:3001/watchlistNaming/rename/${props.watchlistNameID}`, {
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


    

    const data = async () => {
        const response = await fetch(`http://localhost:3001/watchlist/${props.user.uid}`)
        const data = await response.json()
        data.forEach(async (stock) => {
            let stockResponse = await fetch(`http://localhost:3001/stock/${stock.symbol}`)
            let stockData = await stockResponse.json()
            stockData = stockData.result[0]
            stockData = {
                MONGO_ID: stock._id,
                quoteSourceName: stockData.quoteSourceName,
                dividendsPerShare: stockData.dividendsPerShare,
                regularMarketChangePercent: stockData.regularMarketChangePercent,
                regularMarketVolume: stockData.regularMarketVolume,
                longName: stockData.longName,
                symbol: stockData.symbol,
                regularMarketPrice: stockData.regularMarketPrice
            }
            setStockList(stockList => [...stockList, stockData])
        })
        setReady(true)
    }

    useEffect(()=> {
        data()
    },[])



    const loaded = () => {
        const listOfStocks = stockList.map((stock) => {
            return(
                <div className='watchlist'>
                    <Link to={`/stock/${stock.symbol}`}>
                        <h5>{stock.symbol}</h5>
                    </Link>
                    <button onClick={()=> removeFromWatchlist(stock.MONGO_ID,stock.symbol) }>Remove {stock.symbol} from {props.watchlistName}</button>
                </div>
            )
        })
        return(
            <div className='home'>
                <div className="watchlistName">
                    {props.watchlistName ?
                        <h1>{props.watchlistName}</h1>
                        :
                        <h1>Watchlist</h1>
                    }
                </div>
                <div className='watchlistUpdate'>
                    <form className='watchlistUpdate' onSubmit={watchlistNameChangeSubmit}>
                        <input type="text" name="watchlistInput" value={watchlistRename} onChange={watchlistNameChangeInput} />
                        <input type="submit" name="renameSubmit" value="Submit" />
                    </form>
                </div>
                {listOfStocks}
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
                ready ?
                loaded()
                :
                loading() 
            }
        </div>
    )
}

export default Watchlist