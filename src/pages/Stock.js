import {useState,useEffect} from 'react'

const Stock = (props) => {
    
    const [symbol, setSymbol] = useState(null) //.symbol
    const [price, setPrice] = useState(null) //.regularMarketPrice
    const [quoteSource, setQuoteSource] = useState(null) //.quoteSourceName
    const [dividends, setDividends] = useState(null) //.dividendsPerShare
    const [percentChange, setPercentChange] = useState(null) //.regularMarketChangePercent
    const [volume, setVolume] = useState(null) //.regularMarketVolume
    const [name, setName] = useState(null) //.longName

    const data = async () => {
        const response = await fetch(`https://investment-watchlists-backend.herokuapp.com/stock/${props.match.params.symbol}`)
        const data = await response.json()
        const stockData = await props.responseLengthCheck(data)
        console.log(stockData)
        setQuoteSource(stockData.quoteSourceName)
        setDividends(stockData.dividendsPerShare)
        setPercentChange(stockData.regularMarketChangePercent)
        setVolume(stockData.regularMarketVolume)
        setName(stockData.longName)
        setSymbol(stockData.symbol)
        setPrice(stockData.regularMarketPrice)
    
    }

    useEffect(()=> {
        data()
    },[])

    const loaded = () => {
        return(
            <div className='stockSearch'>
                <h1>Name: {name}</h1>
                <p>Ticker: {symbol}</p>
                <p>Quote Source (Exchange): {quoteSource}</p>
                <p>Dividends: {dividends}</p>
                <p>Price: ${price}</p>
                <p>Daily Percent Change: {percentChange}%</p>
                <p>Daily Volume: {volume} Orders</p>
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
                price ?
                loaded()
                :
                loading() 
            }
        </div>
    )
}

export default Stock