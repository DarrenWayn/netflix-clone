import React, { useEffect } from 'react'
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homescreen from './screens/HomeScreen/Homescreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice'
import { StateContextProvider } from './contexts/StateContextProvider'
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth) => {
        if (userAuth) {
          dispatch(
            login({
              uid: userAuth.uid,
              email: userAuth.email
            })
          )
        } else {
          // log out
          dispatch(logout())
        }
    })

    return unsubscribe
  }, [dispatch])
  
  return (
    <div className='App'>
      {!user ? (
        <LoginScreen />
      ) : (
        <StateContextProvider>
          <Routes>
            <Route exact path="/" element={<Homescreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
          </Routes>
        </StateContextProvider>
      )}
      {/* <Routes>
        <Route path='/'>
          <Homescreen />
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
