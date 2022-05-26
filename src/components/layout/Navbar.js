import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import logo from '../../static/logo.png'

const Navbar = (props) => {

  const propFunc = props.onClick
  const notify = (props) => {
    console.log("props", propFunc)
    propFunc()
  }

  const { auth } = props // destructuring auth from the store

  // console.log("this: ", props)
  
  return(
    <div className="navbar-fixed">
      <nav className="nav-wrapper z-depth-0">
        <div className="container">
          <Link to='/'
            className="brand-logo hide-on-sm-only black-text">
              <img src={logo} alt="logo" width="56px" height="56px" />
            </Link>
          { auth.uid 
            ? <SignedInLinks onClick={() => notify()} text="name" /> 
            : <SignedOutLinks /> }
        </div>
      </nav>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("nav" ,state)
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default connect(mapStateToProps)(Navbar)
