const loaded = () => {
    return(
        <div className='stockSearch'>
            <h1>Name: {stock.longName}</h1>
            <p>Ticker: {stock.symbol}</p>
            <div className="dailyInfo">
                <p>Price: ${stock.regularMarketPrice}</p>
                <p>Daily Percent Change: {stock.regularMarketChangePercent}%</p>
                <p>High: {stock.regularMarketDayHigh}</p>
                <p>Low: {stock.regularMarketDayLow}</p>
                <p>Daily Volume: {stock.regularMarketVolume} Orders</p>
                <p>Quote Source: {stock.quoteSourceName}</p>
            </div>
            <div className="preMarketInfo">
                <p>Pre-Market Price: ${stock.preMarketPrice}</p>
                <p>Pre-Market Change: {stock.preMarketChange}</p>
                <p>Pre-Market Percent Change: ${stock.preMarketChangePercent}</p>
            </div>
            <div className="bookInfo">
                <p>Market Cap: {stock.marketCap}</p>
                <p>Dividends per Share: {stock.dividendsPerShare}</p>
                <p>Current PE: {stock.priceEpsCurrentYear}</p>
                <p>Trailing PE: {stock.trailingPE}</p>
                <p>Price to Sales: {stock.priceToSales}</p>
            </div>
            <div className="tradingInfo">
                <p>52 Week High: ${stock.fiftyTwoWeekHigh}</p>
                <p>52 Week Low: ${stock.fiftyTwoWeekLow}</p>
                <p>Beta: {stock.beta}</p>
                <p>Short Ratio: {stock.shortRatio}</p>
                <p>Shares Short: {stock.sharesShort}</p>
                <p>Shares Outstanding: {stock.sharesOutstanding}</p>
                <p>Percent Held by Insiders: {stock.heldPercentInsiders}%</p>
                <p>Percent Held by Institutions: {stock.heldPercentInstitutions}%</p>
            </div>
            <button onClick={() => addToWatchlist(stock.symbol)} >Add to Watchlist</button>
        </div>
    )
}