import {useState,useEffect} from 'react'

const Home = (props) => {

    const [stock, setStock] = useState(null) //.symbol

    

    const data = async () => {
        const response = await fetch('https://investment-watchlists-backend.herokuapp.com/')
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
            <div className='home'>
                <h1>Weclome to the Stock Watchlist App!</h1>
                <h3>Example Ticker: TSLA</h3>
                <h5>Name: {stock.longName}</h5>
                <p>Ticker: {stock.symbol}</p>
                <p>Quote Source: {stock.quoteSourceName}</p>
                <p>Dividends: {stock.dividendsPerShare}</p>
                <p>Price: ${stock.regularMarketPrice}</p>
                <p>Daily Percent Change: {stock.regularMarketChangePercent}%</p>
                <p>Daily Volume: {stock.regularMarketVolume} Orders</p>
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

export default Home