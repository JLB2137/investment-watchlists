import {useState,useEffect} from 'react'

const Stock = (props) => {
    
    const [stock, setStock] = useState(null) //.symbol




    const addToWatchlist = async (ticker) => {
        await fetch('http://localhost:3001/post', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                user: props.user.uid,
                symbol: ticker
            })
        })
    }

    const data = async () => {
        const response = await fetch(`https://investment-watchlists-backend.herokuapp.com/stock/${props.match.params.symbol}`)
        const data = await response.json()
        const stockData = await props.responseLengthCheck(data)
        setStock({
            quoteSourceName: stockData.quoteSourceName,
            dividendsPerShare: stockData.dividendsPerShare,
            regularMarketChangePercent: stockData.regularMarketChangePercent,
            regularMarketVolume: stockData.regularMarketVolume,
            longName: stockData.longName,
            symbol: stockData.symbol,
            regularMarketPrice: stockData.regularMarketPrice
        })
    
    }

    useEffect(()=> {
        data()
    },[])

    const loaded = () => {
        return(
            <div className='stockSearch'>
                <h1>Name: {stock.longName}</h1>
                <p>Ticker: {stock.symbol}</p>
                <p>Quote Source: {stock.quoteSourceName}</p>
                <p>Dividends: {stock.dividendsPerShare}</p>
                <p>Price: ${stock.regularMarketPrice}</p>
                <p>Daily Percent Change: {stock.regularMarketChangePercent}%</p>
                <p>Daily Volume: {stock.regularMarketVolume} Orders</p>
                <button onClick={() => addToWatchlist(stock.symbol)} >Add to Watchlist</button>
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
                stock ?
                loaded()
                :
                loading() 
            }
        </div>
    )
}

export default Stock