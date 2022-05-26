import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import NotificationList from './NotificationList'

const Notification = ({ notifications, auth, profile }) => {
  return(
    <div className="notification-card card z-depth-0 show-up">
      <div className="card-content">
        <span className="card-title">
          <Link to="/">
            <i className="material-icons"> arrow_back </i>
          </Link>
          Notifications
        </span>
          <ul className="notifications">
            <NotificationList notifications={notifications} />
          </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    notifications: state.firestore.ordered.notifications,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default compose(
  firestoreConnect([
    { collection: 'notifications',
        orderBy: ['time', 'desc']
      }
  ]),
  connect(mapStateToProps)
)(Notification)
