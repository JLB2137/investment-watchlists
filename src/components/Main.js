import {useState,useEffect} from 'react'
import {Route} from 'react-router-dom'
import { auth } from '../services/firebase';
import Nav from './Nav'
import About from '../pages/About'
import Home from '../pages/Home'
import Stock from '../pages/Stock'
import Search from '../pages/Search'
import Watchlist from '../pages/Watchlist'
import Settings from '../pages/Settings'

const Main = (props) => {

    //setup state hooks
    //google user
    const [user,setUser] = useState(null)
    //hook for searching stocks
    const [searchStock, setSearchStock] = useState(null)
    //hook to name the watchlist
    const [watchlistName, setWatchlistName] = useState(null)
    //hook for ID provided by mongo for the watchlist name
    const [watchlistNameID, setWatchlistNameID] = useState(null)
    //hook for stock list for watchlist
    const [stockList, setStockList] = useState([])
    //hook for ready to confirm page load
    const [ready, setReady] = useState(null)
    //hook for settings to confirm page load
    const [settingsReady, setSettingsReady] = useState(null)
    //hook for navigation color
    const [navColor, setNavColor] = useState(null)
    //hook for accent colors in nav
    const [accentColor, setAccentColor] = useState(null)
    //hook to confirm whether the account is new
    const [newAccount, setNewAccount] = useState(null)


    //clear the hooks when logging out
    const clearHooks = () => {
        setSearchStock(null)
        setWatchlistName(null)
        setWatchlistNameID(null)
        setStockList([])
        setReady(null)
        setNavColor(null)
        setAccentColor(null)
        console.log("hooks have been cleared")
    }

    //this changes the response output based on what is needed
    //to grab the correct object data, when multiple responses
    //are output it will handle this output and return the first
    const responseLengthCheck = (data) => {
        if (data.result) {
            return(data.result[0])
        } else if (data.language) {
            return(data)
        } else if (data.quoteResponse) {
            return(data.quoteResponse.result[0])
        }
    }

    //grabs the custom name of the watchlist by the user
    //sends this prop to other pages
    const watchlistNaming = async () => {
        let response = await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/watchlistNaming/${user.uid}`)
        response = await response.json()
        const name = await response[0].watchlistName
        const ID = await response[0]._id
        const navColor = await response[0].navColor
        const accentColor = await response[0].accentColor
        setWatchlistName(name)
        setWatchlistNameID(ID)
        setNavColor(navColor)
        setAccentColor(accentColor)
    } 


    //function to confirm if the user is new and set the hook
    const newUserCheck = async () => {
        let response = await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/watchlistNaming/${user.uid}`)
        response = await response.json()
        if (response.length === 0) {
            setNewAccount(true)
        } else {
            setNewAccount(false)
        }
    }

    //this function spefically targets the removed stock from the
    //watchlist and removes it directly from the state
    const removeSymbolFromState = (ticker) => {
        let newSet = []
        stockList.map((stock) => {
            if (stock.symbol !== ticker && newSet.length >= 1) {
                newSet.push(stock)
            } else if (stock.symbol !== ticker && newSet.length <= 1) {
                newSet = [stock]
            }
        })
        setStockList(newSet)
    }


    //this function removes the symbol from the list of symbols
    //in the watchlist database for later pulls
    const removeFromWatchlist = async (tickerID,symbol) => {
        setReady(null)
        await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/post/${tickerID}`, {
            method: "DELETE"
        })
        removeSymbolFromState(symbol)
        setReady(true)
    }

    //resets and creates the watchlist again
    const createWatchlist = async () => {
        //when running this function reset the stockList
        setStockList([])
        const response = await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/watchlist/${user.uid}`)
        const data = await response.json()
        await data.forEach(async (stock) => {
            let stockResponse
            try {
                stockResponse = await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/stock/${stock.symbol}`)
            } catch(err) {
                stockResponse = await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/stock/${stock.symbol}`)
            }
            let stockData = await stockResponse.json()
            stockData = await responseLengthCheck(stockData)
            stockData = {
                MONGO_ID: stock._id,
                quoteSource: stockData.quoteSource,
                dividendsPerShare: stockData.dividendsPerShare,
                regularMarketChangePercent: stockData.regularMarketChangePercent,
                regularMarketVolume: stockData.regularMarketVolume,
                longName: stockData.longName,
                symbol: stockData.symbol,
                regularMarketPrice: stockData.regularMarketPrice
            }
            setStockList(stockList => [...stockList, stockData])
        })
        setReady(true)
    }

    //run authentication and create the watchlist once
    useEffect(() => {
       auth.onAuthStateChanged(user=>setUser(user))
    },[])
 
    //if the watchlist has no name run watchlistnaming and the user check
    useEffect(()=> {
        if (watchlistName === null) {
            watchlistNaming()
            newUserCheck()
        }
    })


    return(
        <div className="Main">
            <Nav
            key={user} 
            user={user}
            clearHooks={clearHooks}
            watchlistName={watchlistName}
            navColor={navColor}
            accentColor={accentColor}
            watchlistNaming={watchlistNaming}
            newUserCheck={newUserCheck}
            />
            <Route exact path='/'>
                <Home  responseLengthCheck={responseLengthCheck} />
            </Route>
            <Route path='/about'>
                <About 
                key={user}
                navColor={navColor}
                accentColor={accentColor}
                />
            </Route>
            <Route path='/settings'>
                <Settings 
                key={user}
                user={user}
                setSettingsReady={setSettingsReady}
                setNewAccount={setNewAccount}
                newAccount={newAccount}
                navColor={navColor}
                setNavColor={setNavColor}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                watchlistName={watchlistName}
                setWatchlistName={setWatchlistName}
                watchlistNaming={watchlistNaming}
                watchlistNameID={watchlistNameID}
                settingsReady={settingsReady}
                />
            </Route>
            <Route path='/stock/:symbol' render={(rp) => (
                <Stock
                    {...rp}
                    key={user}
                    stockList={stockList}
                    responseLengthCheck={responseLengthCheck}
                    user={user}
                    ready={ready}
                    />

            )} />
            <Route path='/search' render={(rp) => (
                <Search 
                    {...rp} 
                    key={user}
                    setSearchStock={setSearchStock} 
                    searchStock={searchStock}
                    createWatchlist={createWatchlist}
                    />
                )} />

            <Route path='/watchlist' render={(rp) => (
                            <Watchlist 
                                {...rp} 
                                key={user}
                                user={user}
                                watchlistName={watchlistName}
                                setWatchlistName={setWatchlistName}
                                watchlistNameID={watchlistNameID}
                                watchlistNaming={watchlistNaming}
                                removeFromWatchlist={removeFromWatchlist}
                                stockList={stockList}
                                ready={ready}
                                createWatchlist={createWatchlist}
                                navColor={navColor}
                                accentColor={accentColor}
                                />
                            )} />
        </div>
    )
}

export default Main