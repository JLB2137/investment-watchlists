import '../views/About.css'

const About = (props) => {
    return(
        <div className="about">
            <div  className="aboutInfo">
                <h1>Welcome to the Stock Watchlists App!</h1>
                <p>I built this app to help track stocks in your portfolio! Information is pulled directly from Yahoo Finance in real-time.</p>
            </div>
            <div className="stockPage" style={{backgroundColor: props.navColor, color: props.accentColor}}>
                <h3>Stock Page</h3>
                <p>Each stock page will give the user access to Daily Information,
                    Pre-Market Information, Book Information, and Trading Information. Each stock can be added to the watchlist from its page.
                    This page is only accessed by either selecting a stock from the watchlist page, searching an equity from the search page, or direct URL manipulation.
                </p>
            </div>
            <div className="searchPage" style={{backgroundColor: props.navColor, color: props.accentColor}}>
                <h3>Search Page</h3>
                <p>You can use the search page to search Yahoo Finance for all US traded equities.</p>
            </div>
            <div className="settingsPage" style={{backgroundColor: props.navColor, color: props.accentColor}}>
                <h3>Settings Page</h3>
                <p>The settings page allows the user to change the name of their watchlist, navigation color, and accent color. This page is only accessible to signed-in users.</p>
            </div>
            <div className="watchlistPage" style={{backgroundColor: props.navColor, color: props.accentColor}}>
                <h3>Watchlist Page</h3>
                <p>The watchlist page maintains information on all saved stocks. By selecting the page from the nav, you will receive up-to-date data on each equity in your list. This page is only accessible to signed-in users.</p>
            </div>
        </div>

    )
}

export default About