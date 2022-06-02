import { useEffect } from 'react'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/userSlice'

function Log() {
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
}

export default Log