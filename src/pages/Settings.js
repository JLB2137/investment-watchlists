import {useState,useEffect} from 'react'
import '../views/Settings.css'

const Settings = (props) => {
    const [watchlistRename,setWatchlistRename] = useState(null)
    const [navColorReset,setNavColorReset] = useState(null)
    const [accentColorReset,setAccentColorReset] = useState(null)
    
    //set watchlist name hook based on input
    const watchlistNameChangeInput = (evt) => {
        setWatchlistRename(
            [evt.target.name] = evt.target.value      
        )
    }

    //set nav color hook based on input
    const navColorChangeInput = (evt) => {
        setNavColorReset(
            [evt.target.name] = evt.target.value      
        )
    }

    //set accent color hook based on input
    const accentColorChangeInput = (evt) => {
        setAccentColorReset(
            [evt.target.name] = evt.target.value      
        )
    }

    //grabs the initial values input by the user
    const initialLoadValues = () => {
        setWatchlistRename(props.watchlistName)
        setNavColorReset(props.navColor)
        setAccentColorReset(props.accentColor)
    }

    //update the stored variable on the DB to reflect the new
    //watchlist name and reset the state for the title
    const watchlistNameChangeSubmit = async (evt) => {
        evt.preventDefault()
        if (props.newAccount === true) {
            //if a new name hasn't been created add it using post
            await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/watchlistNaming/${props.user.uid}`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                user: props.user.uid,
                watchlistName: watchlistRename,
                navColor: navColorReset,
                accentColor: accentColorReset
            })
        })
            console.log("props.watchlistNaming()",props.watchlistNaming())
            //rerun the data to update based on the new post and
            //saved watchlist name
            props.watchlistNaming()
            //set the new account variable to false
            props.setNewAccount(false)
        } else {
            await fetch(`https://investment-watchlists-backend-633b63d06062.herokuapp.com/watchlistNaming/rename/${props.watchlistNameID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    user: props.user.uid,
                    watchlistName: watchlistRename,
                    navColor: navColorReset,
                    accentColor: accentColorReset
                })
            })
            console.log("running the function to update")
        }
        props.setWatchlistName(watchlistRename)
        props.setNavColor(navColorReset)
        props.setAccentColor(accentColorReset)
    }

    useEffect(()=> {
        props.setSettingsReady(true)
    })

    useEffect(()=> {
        initialLoadValues()
    },[])

    const loaded = () => {
        return(
            <div className='settings'>
                <h1>Update User Settings</h1>
                <form className='settingsUpdate' style={{backgroundColor: props.navColor}} onSubmit={watchlistNameChangeSubmit}>
                    <div className='input'>
                        <p style={{color: props.accentColor}}>Watchlist Name:</p>
                        <input className="textInput" type="text" name="watchlistInput" value={watchlistRename} onChange={watchlistNameChangeInput} />
                    </div>
                    <div className='input'>
                        <p style={{color: props.accentColor}}>Navigation Color:</p>
                        <input className="textInput" type="text" name="watchlistInput" value={navColorReset} onChange={navColorChangeInput} />
                    </div>
                    <div className='input'>
                        <p style={{color: props.accentColor}}>Accent Color:</p>
                        <input className="textInput" type="text" name="watchlistInput" value={accentColorReset} onChange={accentColorChangeInput} />
                    </div>
                    <input type="submit" id="submit" name="renameSubmit" value="Update" />
                </form>
                <p id="additionalInfo">Colors can be input as their name (i.e. green), RGB value (i.e. RGB(254,251,210)), or Hex value (i.e. #FEFBD2). </p>
            </div>
        )
    }

    const loading = () => {
        return(
            <div className="loading">
                <h1>Loading Information...</h1>
            </div>
        )
    }

    return(
        <div>
            {
                props.settingsReady ?
                loaded()
                :
                loading() 
            }
        </div>
    )
}

export default Settings
