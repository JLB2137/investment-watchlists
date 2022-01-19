import {Link} from 'react-router-dom'
import {login, logout} from '../services/firebase'
import '../views/Nav.css'

const Nav = (props) => {
    return(
        <div className='Nav'>
            <div className='header'>
                <h1>Stock Watchlists</h1>
            </div>
                {props.user ?
                <div className='links'>
                    <Link to='/about'>
                        <h3>About</h3>
                    </Link>
                    <Link to='/'>
                        <h3>Home</h3>
                    </Link>
                    <Link to='/search'>
                        <h3>Search</h3>
                    </Link>
                    <Link to='/watchlist'>
                        {props.watchlistName ?
                        <h3>{props.watchlistName}</h3>
                        :
                        <h3>Watchlist</h3>
                        }
                    </Link>
                </div>
                :
                <div className='links'>
                    <Link to='/about'>
                        <h3>About</h3>
                    </Link>
                    <Link to='/'>
                        <h3>Home</h3>
                    </Link>
                    <Link to='/search'>
                        <h3>Search</h3>
                    </Link>
                </div>
                }

            {
                props.user ?
                <div className="user">
                    <p>{props.user.displayName}</p>
                    <img src={props.user.photoURL} alt="Account Image" />
                    <button onClick={logout}>Logout</button>
                </div>
                :
                <button onClick={login}>Login</button>
            }
        </div>
    )

}

export default Nav