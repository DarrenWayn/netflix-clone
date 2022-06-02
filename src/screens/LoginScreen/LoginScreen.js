import React, { useState, useRef } from 'react'
import './LoginScreen.css'
import { auth } from '../../firebase'
import SignUpScreen from '../SignUpScreen/SignUpScreen'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false)
    const [query, setQuery] = useState('')
    
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const getStarted = () => {
        setQuery(query)
    }

    const register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message)
        })
    }

    const signIns = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
    <div className='loginScreen'>
        <div className='loginScreen__background'>
            <Link to ='/'>
                <img 
                    className='loginScreen__logo' 
                    src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' 
                    alt=''
                />
            </Link>
            <button 
                onClick={() => setSignIn(true)}
                className='loginScreen__button'
            >
                Sign In
            </button>
            <div className='loginScreen__gradient' />
            <div className='loginScreen_body'>
                {signIn ? (
                    <SignUpScreen 
                        query={query} 
                        setQuery={setQuery}
                        register={register}
                        signIns={signIns}
                        emailRef={emailRef}
                        passwordRef={passwordRef}
                    />
                ) : (
                    <>
                        <h1>Unlimited Films, TV programes and more.</h1>
                        <h2>Watch anywhere. Cancel at any time</h2>
                        <h3>
                            Ready to watch? Enter your email to create or restart your membership.
                        </h3>

                        <div className='loginScreen__input'>
                            <form onSubmit={getStarted}>
                                <input 
                                    type='email' 
                                    placeholder='Email Address'
                                    onChange={(e) => {setQuery(e.target.value)}}
                                />
                                <button
                                    type='submit'
                                    onClick={() => setSignIn(true)}
                                    className='loginScreen__getStarted'
                                >
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
    )
}

export default LoginScreen