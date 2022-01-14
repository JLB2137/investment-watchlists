import {Route} from 'react-router-dom'
import Nav from './Nav'
import About from '../pages/About'
import Home from '../pages/Home'

const Main = (props) => {
    console.log(props.user)
    return(
        <div className="Main">
            <Nav user={props.user} />
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/about'>
                <About />
            </Route>
        </div>
    )
}

export default Main