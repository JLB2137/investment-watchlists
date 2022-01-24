import '../views/Home.css'

const Home = (props) => {

    return(
        <div className='home'>
            <h1>Weclome to the Stock Watchlist App!</h1>
            <h3>Example Ticker: TSLA</h3>
            <h4>Name: Tesla, Inc.</h4>
            <p>Ticker: TSLA</p>
            <p>Quote Source: Nasdaq Real Time Price</p>
            <p>Dividends: 0</p>
            <p>Price: $866.49</p>
            <p>Daily Percent Change: -8.20%</p>
            <p>Daily Volume: 25097609 Orders</p>
        </div>
    )
}

export default Home