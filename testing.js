const [watchlistName, setWatchlistName] = useState(null)
    
const watchlistNaming = async (user) => {
    const response = await fetch(`https://localhost:3001/watchlistNaming/${user}`)
    const name = await response.watchlistName
    setWatchlistName(name)
} 