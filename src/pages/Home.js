import {useState,useEffect} from 'react'

const Home = () => {

    const [price, setPrice] = useState(null) //.regularMarketPrice
    const [quoteSource, setQuoteSource] = useState(null) //.dividendsPerShare
    const [dividends, setDividends] = useState(null) //.dividendsPerShare
    const [percentChange, setPercentChange] = useState(null) //.regularMarketChangePercent
    const [volume, setVolume] = useState(null) //.regularMarketVolume

    const data = async () => {
        const response = await fetch('http://localhost:3001/')
        const data = await response.json()
        setPrice(data.regularMarketPrice)
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

export default Home