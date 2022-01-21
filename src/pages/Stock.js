import {useState,useEffect} from 'react'
import '../views/Stock.css'

const Stock = (props) => {
    
    const [stock, setStock] = useState(null) //.symbol
    const [inWatchlist, setInWatchlist] = useState(null)




    const checkIfInWatchlist = () => {
        props.stockList.map((stockListSearch)=> {
            if (stockListSearch.symbol === props.match.params.symbol.toUpperCase()) {
                setInWatchlist(true)
            }
        })
    }

    const addedToWatchlist = async () => {
        addToWatchlist(stock.symbol)
        setInWatchlist(true)
    }


    const addToWatchlist = async (ticker) => {
        await fetch('https://investment-watchlists-backend.herokuapp.com/post', {
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
            regularMarketPrice: stockData.regularMarketPrice,
            priceEpsCurrentYear: stockData.priceEpsCurrentYear,
            trailingPE: stockData.trailingPE,
            priceToSales: stockData.priceToSales,
            marketCap: stockData.marketCap,
            shortRatio: stockData.shortRatio,
            preMarketPrice: stockData.preMarketPrice,
            preMarketChange: stockData.preMarketChange,
            preMarketChangePercent: stockData.preMarketChangePercent,
            regularMarketDayHigh: stockData.regularMarketDayHigh,
            regularMarketDayLow: stockData.regularMarketDayLow,
            fiftyTwoWeekHigh: stockData.fiftyTwoWeekHigh,
            fiftyTwoWeekLow: stockData.fiftyTwoWeekLow,
            beta: stockData.beta,
            sharesOutstanding: stockData.sharesOutstanding,
            sharesShort: stockData.sharesShort,
            heldPercentInsiders: stockData.heldPercentInsiders,
            heldPercentInstitutions: stockData.heldPercentInstitutions
        })
        checkIfInWatchlist()
    }



    useEffect( async ()=> {
        await data()
    },[])

    const loaded = () => {
        return(
            <div className='stockSearch'>
                <div className='stockHeader'>
                    <h1>Name: {stock.longName}</h1>
                    <p>Ticker: {stock.symbol}</p>
                </div>
                <div className="dailyInfo">
                    <h4>Daily Information</h4>
                    <p>Price: ${stock.regularMarketPrice}</p>
                    <p>Daily Percent Change: {stock.regularMarketChangePercent}%</p>
                    <p>High: {stock.regularMarketDayHigh}</p>
                    <p>Low: {stock.regularMarketDayLow}</p>
                    <p>Daily Volume: {stock.regularMarketVolume} Orders</p>
                    <p>Quote Source: {stock.quoteSourceName}</p>
                </div>
                <div className="preMarketInfo">
                    <h4>Pre-Market Information</h4>
                    <p>Pre-Market Price: ${stock.preMarketPrice}</p>
                    <p>Pre-Market Change: {stock.preMarketChange}</p>
                    <p>Pre-Market Percent Change: ${stock.preMarketChangePercent}</p>
                </div>
                <div className="bookInfo">
                    <h4>Book Information</h4>
                    <p>Market Cap: {stock.marketCap}</p>
                    <p>Dividends per Share: {stock.dividendsPerShare}</p>
                    <p>Current PE: {stock.priceEpsCurrentYear}</p>
                    <p>Trailing PE: {stock.trailingPE}</p>
                    <p>Price to Sales: {stock.priceToSales}</p>
                </div>
                <div className="tradingInfo">
                    <h4>Trading Information</h4>
                    <p>52 Week High: ${stock.fiftyTwoWeekHigh}</p>
                    <p>52 Week Low: ${stock.fiftyTwoWeekLow}</p>
                    <p>Beta: {stock.beta}</p>
                    <p>Short Ratio: {stock.shortRatio}</p>
                    <p>Shares Short: {stock.sharesShort}</p>
                    <p>Shares Outstanding: {stock.sharesOutstanding}</p>
                    <p>Percent Held by Insiders: {stock.heldPercentInsiders}%</p>
                    <p>Percent Held by Institutions: {stock.heldPercentInstitutions}%</p>
                </div>
                <div className='buttonInfo'>
                    {inWatchlist ?
                        <h1>Added to Watchlist</h1>
                        :
                        <button onClick={addedToWatchlist} >Add to Watchlist</button>
                    }
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
                props.ready && stock ?
                loaded()
                :
                loading() 
            }
        </div>
    )
}

export default Stock