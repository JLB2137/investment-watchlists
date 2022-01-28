import '../views/About.css'

const About = () => {
    return(
        <div className="about">
            <h1 className="aboutInfo">Welcome to the Stock Watchlists App</h1>
            <p className="aboutInfo">I built this watchlist app to help track stocks in your portfolio! Information is pulled directly from Yahoo Finance in real-time.</p>
            <h3>Stock Page</h3>
            <p>Provided on each stock page will give the user access to Daily Information,
                 Pre-Market Information, Book Information, and Trading Information. Each stock can be added to the watchlist from this page.
                 This page is only accessed by either selecting a stock from the watchlist's page, searching an equity from the search page, or direct URL manipulation.
            </p>
            <h3 className="searchPage">Search Page</h3>
            <p className="searchPage">You can use the search page to search Yahoo Finance for all US traded equities.</p>
            <h3 className="settingsPage">Settings Page</h3>
            <p className="settingsPage">The settings page allows the user to change the name of their watchlist, navigation color, and accent color. This page is only accessible to logged-in users.</p>
            <h3 className="watchlistPage">Watchlist Page</h3>
            <p className="watchlistPage">The watchlist page maintains information on all saved stocks. By selecting the page from the nav, you will recieve up-to-date data on each equity in your list. This page is only accessible to logged-in users.</p>
        </div>

    )
}

export default About