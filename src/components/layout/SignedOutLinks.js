import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return(
    <div>
      <ul className="right">
        <li><NavLink to='/signup' className="black-text">Sign Up</NavLink></li>
        <li><NavLink to='/signin' className="black-text">Log In</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks
