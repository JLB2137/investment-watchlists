import {useState,useEffect} from 'react'
import '../views/Stock.css'

const Stock = (props) => {
    
    //stock being searched
    const [stock, setStock] = useState(null)
    //check for whether it is currently in the watchlist
    const [inWatchlist, setInWatchlist] = useState(null)



    //function to check whether the symbol has been added to the watchlist
    const checkIfInWatchlist = () => {
        props.stockList.map((stockListSearch)=> {
            if (stockListSearch.symbol === props.match.params.symbol.toUpperCase()) {
                setInWatchlist(true)
            }
        })
    }

    //function to add it to the database for pull in watchlist
    const addToWatchlist = async (ticker) => {
        await fetch('https://investment-watchlists-backend-633b63d06062.herokuapp.com/post', {
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
    
    //function to add it to the database for pull in watchlist
    const addedToWatchlist = async () => {
        addToWatchlist(stock.symbol)
        setInWatchlist(true)
    }

    //grab data returned from backend on stock
    const data = async () => {
        const response = await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/stock/${props.match.params.symbol}`)
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
        //if the the user is signed in
        if (props.user) {
            checkIfInWatchlist()
        }
    }



    useEffect( async ()=> {
        await data()
    },[])

    const loaded = () => {
        return(
            <div className='stockSearch'>
                <div className='stockHeader'>
                    <h1>{stock.longName}</h1>
                    <p>Ticker: {stock.symbol}</p>
                    <div className='buttonInfo'>
                        {props.user ?
                            inWatchlist ?
                            <h5>Added to Watchlist</h5>
                            :
                            <button onClick={addedToWatchlist} >Add to Watchlist</button>
                        :
                        <></>
                        }
                    </div>
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
            { props.user ?
                
                props.ready && stock ?
                    loaded()
                    :
                    loading()

                :
                
                stock ?
                    loaded()
                    :
                    loading()
            }
        </div>
    )
}

export default Stock