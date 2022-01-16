import {useState} from 'react'
import {Route} from 'react-router-dom'
import Nav from './Nav'
import About from '../pages/About'
import Home from '../pages/Home'
import Stock from '../pages/Stock'
import Search from '../pages/Search'

const Main = (props) => {

    const [searchStock, setSearchStock] = useState(null)

    //this changes the response output based on what is needed
    //to grab the correct object data, when multiple responses
    //are output it will handle this output and return the first
    const responseLengthCheck = (data) => {
        if (data.result) {
            return(data.result[0])
        } else if (data.language) {
            return(data)
        }
    }

    return(
        <div className="Main">
            <Nav user={props.user} />
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
                    />

            )} />
            <Route path='/search' render={(rp) => (
                <Search 
                    {...rp} 
                    setSearchStock={setSearchStock} 
                    searchStock={searchStock}
                    />
                )} />
        </div>
    )
}

export default Main