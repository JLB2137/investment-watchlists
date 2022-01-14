import {useState,useEffect} from 'react'

const Stock = (props) => {
    
    const [price, setPrice] = useState(null) //.regularMarketPrice
    const [quoteSource, setQuoteSource] = useState(null) //.dividendsPerShare
    const [dividends, setDividends] = useState(null) //.dividendsPerShare
    const [percentChange, setPercentChange] = useState(null) //.regularMarketChangePercent
    const [volume, setVolume] = useState(null) //.regularMarketVolume

    const data = async () => {
        const response = await fetch(`http://localhost:3001/stock/${props.match.params.symbol}`)
        const data = await response.json()
        console.log(data.result[0].regularMarketPrice)
        setPrice(data.result[0].regularMarketPrice)
    }

    useEffect(()=> {
        data()
    },[])

    const loaded = () => {
        return(
            <h1>Price is: ${price}</h1>
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