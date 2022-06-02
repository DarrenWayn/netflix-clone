import React from 'react'
import './SignUpScreen.css'

const SignUpScreen = ({ setQuery, query, register, signIns, emailRef, passwordRef }) => {
  return (
    <div className='signupScreen'>
      <form>
        <h1>Sign In</h1>
        <input 
          ref={emailRef}
          placeholder= {query ? query : 'Email'}
          // this onChange is for bisa di delete valuenya ga cuma di taro di loginscreen doang onchangenya
          onChange={(e) => {setQuery(e.target.value)}}
          // onFocus={(e) => e.target.placeholder = 'Email'}
          value={query}
          type='email' 
          />
        <input ref={passwordRef} placeholder='Password' type='password' />
        <button type='submit' onClick={signIns}>Sign In</button>

        <h4>
          <span className='signupScreen__gray'>New to Netflix?</span>
          <span className='signupScreen__link'onClick={register} >Sign Up now.</span>
        </h4>
      </form>
    </div>
  )
}

export default SignUpScreen