import logo from './logo.svg';
import {useState, useEffect} from 'react'
import {Switch} from 'react-router-dom'
import Main from './components/Main'
import { auth } from './services/firebase';

//adjustment to app.js

function App() {

  const [user,setUser] = useState(null)

  useEffect( ()=> {
    auth.onAuthStateChanged(user=>setUser(user))
  }
    ,[])

  return (
    <div className="App">
      <Switch>
        <Main user={user} />
      </Switch>
    </div>
  );
}

export default App;
