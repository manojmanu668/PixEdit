import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import person from '../../static/icons/person.svg'
import { useSelector } from 'react-redux'

const Users = ({users}) => {

  const auth = useSelector(state => state.firebase.auth);

  const handleError = (e) => {
    const targetEl = e.target
    targetEl.src = person
    targetEl.classList.add('alt_img')
  }

  // console.log("usrs: ", users)
  return(
    <div className="user_list_wrapper card z-depth-0">
      <div className="people">
        <span> People </span>
      </div>
      <ul>
        { users && users.map(user => {

          const image = user.imageUrl || user.avatarUrl || user.photoUrl
          if(user.id != auth.uid){
            return (
              <Link
                key={user.id}
                to={'profile/' + user.id}
                className="black-text">
                <div className="user_ind">
                  <li>
                    <span className="userimage">
                      <img 
                        src={`${image}`}
                        onError={(e) => handleError(e)}
                        className="circle_img"
                        alt="dp"
                        height="40px"
                        width="40px" />
  
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
          }
          
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.users,
    //auth: state.firebase.auth
  }
}

export default compose(
  firestoreConnect([
    {
      collection:'users',
      orderBy: ['fullName', 'asc']
    }]),
  connect(mapStateToProps)
)(Users)
