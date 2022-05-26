import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import person from '../../static/icons/person.svg'

const Users = ({users, store}) => {

  const handleError = (e) => {
    const target = e.target
    target.src = person
    target.classList.add('alt_img')
  }

  // console.log("usrs: ", users)
  return(
    <div className="mobile_user_wrapper">
        <div className="mobile_user">
            <div className="user_list_wrapper card z-depth-0">
                <div className="people">
                  <div className="people_title">
                    <span> 
                      <Link to='/'>
                        <i className="material-icons"> arrow_back </i>
                      </Link>
                    </span>
                    People
                  </div>
                </div>
                <ul>
                  { users && users.map(user => {
                  const userImage = user.imageUrl || user.avatarUrl
                  return (
                      <Link
                      key={user.id}
                      to={'profile/' + user.id}
                      className="black-text">
                      <div className="user_ind">
                          <li>
                          <span className="userimage">
                            { userImage
                              ? <img
                                  src={userImage}
                                  onError={(e) => handleError(e)}
                                  className="circle_img"
                                  alt="dp"
                                  height="40px"
                                  width="40px" />
                              : <span className="avatar">
                                  <i className="material-icons">person</i>
                                  </span>}
                          </span>
                          <div className="names">
                              <span className="username">
                              {user.fullName}
                              </span>
                              <span className="uname">
                              @{user.username}
                              </span>
                          </div>
                          </li>
                      </div>
                      </Link>
                  )
                  })}
                </ul>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.users
  }
}

export default compose(
  firestoreConnect([
    {collection:'users'}
  ]),
  connect(mapStateToProps)
)(Users)
