import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../views/Watchlist.css'

const Watchlist = (props) => {


    useEffect(()=> {
        props.createWatchlist()
    },[])



    const loaded = () => {
        const listOfStocks = props.stockList.map((stock) => {
            return(
                <div className='watchlistStock' style={{backgroundColor: props.navColor, color: props.accentColor}}>
                    <Link to={`/stock/${stock.symbol}`} style={{color: props.accentColor}}>
                        <h5>{stock.symbol}</h5>
                    </Link>
                    <p>{stock.longName}</p>
                    <p>Price: ${stock.regularMarketPrice}</p>
                    <p>Daily Change: {stock.regularMarketChangePercent}%</p>
                    <p>Daily Volume: {stock.regularMarketVolume} Orders</p>
                    <button onClick={()=> props.removeFromWatchlist(stock.MONGO_ID,stock.symbol) }>Remove from Watchlist</button>
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
                <div className='listOfStocks'>
                    {listOfStocks}
                </div>
            </div>
        )
    }

    const loading = () => {
        return(
            <div className="loading">
                <h1>Loading Information...</h1>
            </div>
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