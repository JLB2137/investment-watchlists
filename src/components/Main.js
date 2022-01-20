import {useState,useEffect} from 'react'
import {Route} from 'react-router-dom'
import Nav from './Nav'
import About from '../pages/About'
import Home from '../pages/Home'
import Stock from '../pages/Stock'
import Search from '../pages/Search'
import Watchlist from '../pages/Watchlist'

const Main = (props) => {

    const [searchStock, setSearchStock] = useState(null)
    const [watchlistName, setWatchlistName] = useState(null)
    const [watchlistNameID, setWatchlistNameID] = useState(null)

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
        let response = await fetch(`https://investment-watchlists-backend.herokuapp.com/watchlistNaming/${props.user.uid}`)
        response = await response.json()
        const name = await response[0].watchlistName
        const ID = await response[0]._id
        setWatchlistName(name)
        setWatchlistNameID(ID)
    } 

    useEffect(()=> {
        //Only run this if the page is initially loading data
        //once hook is set, do not run again
        //purpose is to allow updates to stick when changing the
        //watchlist name
        if (watchlistName === null) {
            watchlistNaming()
        }
    })


    return(
        <div className="Main">
            <Nav 
            user={props.user}
            watchlistName={watchlistName} 
            />
            <Route exact path='/'>
                <Home  responseLengthCheck={responseLengthCheck} />
            </Route>
            <Route path='/about'>
                <About />
            </Route>
            <Route path='/stock/:symbol' render={(rp) => (
                <Stock
                    {...rp}
                    responseLengthCheck={responseLengthCheck}
                    user={props.user} 
                    />

            )} />
            <Route path='/search' render={(rp) => (
                <Search 
                    {...rp} 
                    setSearchStock={setSearchStock} 
                    searchStock={searchStock}
                    />
                )} />

            <Route path='/watchlist' render={(rp) => (
                            <Watchlist 
                                {...rp} 
                                setSearchStock={setSearchStock} 
                                searchStock={searchStock}
                                user={props.user}
                                responseLengthCheck={responseLengthCheck}
                                watchlistName={watchlistName}
                                setWatchlistName={setWatchlistName}
                                watchlistNameID={watchlistNameID}
                                watchlistNaming={watchlistNaming}
                                />
                            )} />
        </div>
    )
}

export default Main