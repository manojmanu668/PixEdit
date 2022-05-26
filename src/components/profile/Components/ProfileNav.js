import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOutAction } from '../../../store/actions/AuthActions'
import logo from '../../../static/logo.png'

const ProfileNav = (props) => {
  // console.log(props.profile)
  // const { profile } = props
  return(
    <div className="nav">
      <div className="container">
        <ul>
          <li>
            <Link to='/' className="blue-text logo">
              <span className="logo">
                <img src={logo} alt="logo" width="46px" height="46px" />
              </span>
            </Link>
          </li>
          <li className="hide-on-med-and-up logout">
            <Link
              to='/'
              className="black-text"
              onClick={props.signOut}>
                <span> logout </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (props) => dispatch(signOutAction(props.auth.uid))
  }
}

export default connect(null, mapDispatchToProps)(ProfileNav)
