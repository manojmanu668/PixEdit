import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeConversations } from '../message/actions';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import MessageNavBar from './MessageNavBar';
import './style.css';
import person from '../../static/icons/person.svg'

const User = (props) => {


  const {user, onClick,key} = props;
  const image = user.imageUrl || user.avatarUrl || user.photoUrl
  console.log("imge in userf",key)
  // return (
  //   <div onClick={() => onClick(user)} className="mdisplayName">
  //                 <div className="displayPic">
  //                   <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
  //                 </div>
  //                 <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
  //                     <span style={{fontWeight: 500}}>{user.fullName}</span>
  //                     <span className={user.isOnline ? `monlineStatus` : `monlineStatus off`}></span>
  //                 </div>
  //             </div>
  // );
}

const Message = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.firebase.auth);
  const user = useSelector(state => state.firestore.ordered.users);
  const conversations = useSelector(state => state.user.conversations)
  // const user = [];
  // user.push(obj);
  //const user = users;
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  const [samp, setSamp] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  let unsubscribe;

  const paramId = props.location.state

   console.log("msg parmId",paramId)
   console.log("msg page parmId",user)

  const initChat = (user) => {

    setChatStarted(true);
    console.log("cuser user",user);
    setChatUser(user.fullName);
    setUserUid(user.id);

    console.log('cuser',user);

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.id }));
    

  }

  const submitMessage = (e) => {

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message
    }


    if(message !== ""){
      dispatch(updateMessage(msgObj))
      .then(() => {
        setMessage('')
      });
    }

    console.log(msgObj);

  }

  const handleError = (e) => {
    const targetEl = e.target
    targetEl.src = person
    targetEl.classList.add('alt_img')
  }

  //console.log("cuser in func",chatUser)

  return (

  <div>
      <MessageNavBar />

    <section className="mcontainer">

      <div className="mlistOfUsers">

          <input type="text" placeholder="Search....." onChange={event => {setSearchTerm(event.target.value)}}/>
          {
            user &&
            user.filter((user) => {
              if(searchTerm == ""){
                return user
              } else if (user.fullName.toLowerCase().includes(searchTerm.toLowerCase())){
                return user
              }
            }).map(user => {
              const image = user.imageUrl || user.avatarUrl || user.photoUrl
              if(user.id != auth.uid){
                return (
                  <div onClick={() => initChat(user)} className="mdisplayName">
                                <div className="displayPic">
                                  <img src={`${image}`} onError={(e) => handleError(e)} alt="dp" />
                                </div>
                                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                                    <span style={{fontWeight: 500}}>{user.fullName}</span>
                                    <span className={user.isOnline ? `monlineStatus` : `monlineStatus off`}></span>
                                </div>
                            </div>
                );
                // return <User 
                //   onClick={initChat}
                //   key={user.uid} 
                //   user={user} 
                //   />
              }
            }) 
          }

            
                    
      </div>

        <div className="mchatArea">
            
            <div className="mchatHeader"> 
              <span>
                {
                  chatStarted ? chatUser : ''
                }
              </span>
           
            </div>
              <div className="mmessageSections">
                  {
                    chatStarted ? 
                    conversations.map(con =>
                      <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
                      <p className="mmessageStyle" >{con.message}</p>
                    </div> )
                    : null
                  }
              </div>
              {
              chatStarted ? 
              <div className="mchatControls">
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write Message"
                />
                <button onClick={submitMessage}>Send</button>
              </div> : null
            }
            
        </div>
      </section>
    </div>
      
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.firestore.ordered.users,
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
)(Message)
