import {useState,useEffect} from 'react'

const Settings = (props) => {
    const [watchlistRename,setWatchlistRename] = useState(null)
    const [navColorReset,setNavColorReset] = useState(null)
    const [accentColorReset,setAccentColorReset] = useState(null)
    

    const watchlistNameChangeInput = (evt) => {
        setWatchlistRename(
            [evt.target.name] = evt.target.value      
        )
    }

    const navColorChangeInput = (evt) => {
        setNavColorReset(
            [evt.target.name] = evt.target.value      
        )
    }

    const accentColorChangeInput = (evt) => {
        setAccentColorReset(
            [evt.target.name] = evt.target.value      
        )
    }

    //update the stored variable on the DB to reflect the new
    //watchlist name and reset the state for the title
    const watchlistNameChangeSubmit = async (evt) => {
        evt.preventDefault()
        if (props.watchlistName === null) {
            //if a new name hasn't been created add it using post
            await fetch(`https://investment-watchlists-backend.herokuapp.com/watchlistNaming/${props.user.uid}`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                user: props.user.uid,
                watchlistName: watchlistRename
            })
        })
            console.log("props.watchlistNaming()",props.watchlistNaming())
            //rerun the data to update based on the new post and
            //saved watchlist name
            props.watchlistNaming()
        } else {
            await fetch(`https://investment-watchlists-backend.herokuapp.com/watchlistNaming/rename/${props.watchlistNameID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    user: props.user.uid,
                    watchlistName: watchlistRename
                })
            })
        }
        props.setWatchlistName(watchlistRename)
    }

    const colorChangeSubmit = async (evt) => {
        evt.preventDefault()
        if (props.colorID === null) {
            //if a new name hasn't been created add it using post
            await fetch(`https://investment-watchlists-backend.herokuapp.com/colorScheme/${props.user.uid}`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                user: props.user.uid,
                navColor: navColorReset,
                accentColor: accentColorReset
            })
        })
            //rerun the data to update based on the new post and
            //saved watchlist name
            props.colorScheme()
        } else {
            await fetch(`https://investment-watchlists-backend.herokuapp.com/colorScheme/change/${props.colorID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    user: props.user.uid,
                    navColor: navColorReset,
                    accentColor: accentColorReset
                })
            })
        }
        props.setNavColor(navColorReset)
        props.setAccentColor(navColorReset)
    }


    const loaded = () => {
        return(
            <div className='settings'>
                <form className='watchlistUpdate' onSubmit={watchlistNameChangeSubmit}>
                    <p>Update Watchlist Name:</p>
                    <input type="text" name="watchlistInput" value={watchlistRename} onChange={watchlistNameChangeInput} />
                    <input type="submit" name="renameSubmit" value="Update" />
                </form>
                <form className='colorUpdates' onSubmit={colorChangeSubmit}>
                    <p>Update Nav Color:</p>
                    <input type="text" name="watchlistInput" value={navColorReset} onChange={navColorChangeInput} />
                    <input type="submit" name="renameSubmit" value="Update" />
                    <p>Update Accent Color:</p>
                    <input type="text" name="watchlistInput" value={accentColorReset} onChange={accentColorChangeInput} />
                    <input type="submit" name="renameSubmit" value="Update" />
                </form>
            </div>
        )
    }

    const loading = () => {
        return(
            <h1>Loading...</h1>
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
