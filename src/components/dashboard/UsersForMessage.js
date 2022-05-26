import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { firestoreConnect } from 'react-redux-firebase'
import person from '../../static/icons/person.svg'

const UsersForMessage = ({users,auth},props) => {

  const [chatStarted,setChatStarted] = useState('')
  const {forICHandler} = props

    const handleError = (e) => {
        const targetEl = e.target
        targetEl.src = person
        targetEl.classList.add('alt_img')
      }

    const initChat = (id) =>{
      //setChatStarted(true)
      console.log("usrs chatU:",id)
    }
      
   console.log("usrs: ", users)
   console.log("usrs: auth",auth.uid)
  return(
    
    <div className="muser_list_wrapper card z-depth-0">
      <ul>
        { users && users.map(user => {

          const image = user.imageUrl || user.avatarUrl || user.photoUrl
          return (
            <div
              className="black-text">
              <div className="user_ind" onClick={()=>{forICHandler({user})}}>
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
                    <span className="uname" >
                    <span className={user.isOnline ? `monlineStatus` : `monlineStatus off`}></span>
                    </span>
                  </div>
                </li>
              </div>
            </div>
          )
        })}
      </ul>
      {/* <section className="mcontainer">
        
          <div className="mchatArea">
            <div className="mchatHeader"> Rizwan Khan </div>
          <div className="mmessageSections">
            <div style={{ textAlign: 'left' }}>
                  <p className="mmessageStyle" >Hello User</p>
              </div>
          </div>
          <div className="mchatControls">
            <textarea />
            <button>Send</button>
        </div>
      </div>
       
      </section> */}
      
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.users,
    auth: state.firebase.auth
  }
}

export default compose(
  firestoreConnect([
    {
      collection:'users',
      orderBy: ['fullName', 'asc']
    }]),
  connect(mapStateToProps)
)(UsersForMessage)

{/* <div className="user_list_wrapper card z-depth-0">
      <ul>
        { users && users.map(user => {

          const image = user.imageUrl || user.avatarUrl || user.photoUrl
          return (
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

          )
        })}
      </ul>
    </div> */}