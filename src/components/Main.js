import {Route} from 'react-router-dom'
import Nav from './Nav'
import About from '../pages/About'
import Home from '../pages/Home'
import Stock from '../pages/Stock'

const Main = (props) => {
    

    return(
        <div className="Main">
            <Nav user={props.user} />
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/about'>
                <About />
            </Route>
            <Route path='/stock/:symbol' render={(rp) => (
                <Stock
                    {...rp}
                    />

            )} />
        </div>
    )
}

export default Main