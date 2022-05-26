import React from 'react'
import { connect } from 'react-redux'
import { NavLink,Link  } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux';

// import DropDown from './dropDown'
import user from '../../static/icons/person.svg'
import { signOutAction } from '../../store/actions/AuthActions'
// import Notification from '../dashboard/Notification'

const SignedInLinks = (props) => {
  // console.log("props", props)
  
  const { profile } = props
  const userImage = profile.imageUrl || profile.avatarUrl || user
  const id = props.auth.uid
  // const { notifications } = props
  const dispatch = useDispatch();

  // const onlineset = () => {
  //   const db = firebase.firestore()
  //   db.collection('users')
  //   .doc(id)
  //   .update({
  //       isOnline: false
  //   }).then(() => {
  //     console.log("signout online")
      
  // })
  // .catch(error => {
  //     console.log('signout online err',error.message)
  // })
  // }


  return(
    <div className="nav_logo_cont_wrap">
      <ul className="right nav-links">
        <li >
        <NavLink to={'/message/'+ id} style={{color :'black'}} > Messages </NavLink>
        </li>
        <li onClick={() => props.onClick()} 
          className="hide-on-small-only black-text">
          &nbsp; &nbsp;Notifications
        </li>
        <li className="drop_down-btn">
          <NavLink to={'/profile/'+ id}>
            <img
              src={userImage}
              className="btn btn-floating transparent z-depth-0"
              alt="dp"
              height="40px"
              width="40px" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            className="black-text"
            onClick={() => {
              dispatch(signOutAction(props.auth.uid))
            }}>
              logout
          </NavLink>
        </li>
      </ul>
      
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (uid) => dispatch(signOutAction(uid))
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
