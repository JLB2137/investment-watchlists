import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDn6GcfJP-kJA71cH4rP_zL9bXk_ygQbJY",
    authDomain: "investment-watchlists.firebaseapp.com",
    projectId: "investment-watchlists",
    storageBucket: "investment-watchlists.appspot.com",
    messagingSenderId: "328878223170",
    appId: "1:328878223170:web:f8c8ea666e09030e8422db"
  };

  firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()

  const googleProvider = new firebase.auth.GoogleAuthProvider()

  const login = () => {
      return(
          auth.signInWithPopup(googleProvider)
        )
    }

  const logout = () => {
      return(
          auth.signOut()
      )
    }

  export {auth, login, logout}