import { useMediaQuery } from 'react-responsive';
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {login, logout} from '../services/firebase'
import '../views/Nav.css'

const Nav = (props) => {

    //hook to track switch for nav
    const [navPopChange, setNavPopChange] = useState(false)

    //determines if the screen is mobile or below 700px width
    const isMobile = useMediaQuery({ query: `(max-width: 1000px)` });
    const removeHamburger = useMediaQuery({ query: `(max-width: 700px)` });


    //resets the nav based on mobile to show either login info or page routing
    const navPop = () => {
        if (navPopChange === true && isMobile === true) {
            setNavPopChange(false)
            console.log("isMobile",isMobile)
        } else if (navPopChange === false && isMobile === true) {
            setNavPopChange(true)
            console.log("isMobile",isMobile)
        }
    }

    const login2 = async () => {
        await login()
        try {
            await props.watchlistNaming()
            await props.newUserCheck()
        } catch(err) {
            await props.watchlistNaming()
            await props.newUserCheck()
            console.log("there was an error")
        }
        console.log("login complete")
    }

    const logout2 = async () => {
        await logout()
        await props.clearHooks()
    }



    return(
        <div className='Nav' style={{
            backgroundColor: props.user ? 
                    props.navColor
                    :
                    "dodgerblue", 
            color: props.user ? 
                props.accentColor
                :
                "White"
            }}>
            <div className='header'>
                <h1 id="appName">Stock Watchlists</h1>
                <h1 id="hamburger" style={{display: !props.user || props.user && !removeHamburger ? "none": "flex"}} onClick={navPop}>≡</h1>
            </div>
                {props.user ?
                <div className='links' style={{display: isMobile ? navPopChange ? "none": "flex" : "flex"}}>
                    <Link to='/' style={{color: props.accentColor}}>
                        <h3>Home</h3>
                    </Link>
                    <Link to='/about'   style={{color: props.accentColor}}>
                        <h3>About</h3>
                    </Link>
                    <Link to='/search' style={{color: props.accentColor}}>
                        <h3>Search</h3>
                    </Link>
                    <Link to='/watchlist' style={{color: props.accentColor}}>
                        {props.watchlistName ?
                        <h3>{props.watchlistName}</h3>
                        :
                        <h3>Watchlist</h3>
                        }
                    </Link>
                    <Link to='/settings' style={{color: props.accentColor}}>
                        <h3>Settings</h3>
                    </Link>
                </div>
                :
                <div className='links'>
                    <Link to='/' style={{color: "white"}}>
                        <h3>Home</h3>
                    </Link>
                    <Link to='/about' style={{color: "white"}}>
                        <h3>About</h3>
                    </Link>
                    <Link to='/search' style={{color: "white"}}>
                        <h3>Search</h3>
                    </Link>
                </div>
                }

            {
                props.user ?
                <div className="user" style={{display: isMobile ? navPopChange ? "flex": "none" : "flex"}}>
                    <p id="displayName">{props.user.displayName}</p>
                    <img src={props.user.photoURL} alt="Account Image" />
                    <Link to="/">
                    <button onClick={logout2}>Logout</button>
                    </Link>
                </div>
                :
                <div className="user">
                    <button onClick={login2}>Login</button>
                </div>
            }
        </div>
    )

}

export default Nav