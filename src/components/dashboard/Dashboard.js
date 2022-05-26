import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
// import { addUserAfterGoogleSignIn } from '../../store/actions/AuthActions'
import Notification from './Notification'
import Navbar from '../layout/Navbar'
import MobileNavbar from '../layout/MobileNavbar'
import ProjectList from '../projects/ProjectList'
// import { Album } from '../projects/Album'
// import Footer from './Footer'
// import Spinner from '../../loaders/Spinner'
import CreatePost from '../projects/CreatePost'
import { CreatePostMobile } from '../projects/CreatePostMobile'
// import Category from './Category'
import Users from './Users'
// import Intro from '../layout/Intro'
import Homepage from '../message/containers/HomePage/index'

class Dashboard extends Component {
  
  constructor() {
    super()

    this.post = []
    this.users = []
    this.lastVisible = ''
    this.followers = []
    this.notificationPanel = React.createRef()
    this.createPost = React.createRef()

    this.state = {
      isAlbumSelected: false,
      isLoading: true,
      style: {
          display: "none"
      }
    }
    this.mobileNav = React.createRef()
  }

  

  // TODO: get the posts manually and dispatch it
  // to the store
  // TODO: set data to local storage once component
  // successfully mounted

  componentDidMount(props) {
    // addUserAfterGoogleSignIn()
    this.getPosts()
    // props && this.getStoreId()
    // this.getUsers()
  }

  // getStoreId = () => {
  //   const db = firebase.firestore()
  //   const userId = this.props && this.props.auth.uid

  //   return db.collection('stores')
  //     .where("ownerId", "==", userId )
  //     .get()
  //     .then(documentSnapshot => {
  //       documentSnapshot.forEach(doc => {
  //         this.setState(() => {
  //           return {
  //             storeId: doc.id
  //           }
  //         })
  //       })
  //     })
  // }

  // getUsers = () => {
  //   const db = firebase.firestore()

  //   return db.collection('users')
  //     .orderBy('firstName')
  //     .get().then(documentSnapshots => {
  //       documentSnapshots.forEach(doc => {
  //         let obj = {
  //           ...doc.data(),
  //           id: doc.id
  //         }
  //         this.users.push(obj)
  //         this.setState(() => {
  //           return {
  //             users: this.users
  //           }
  //         })
  //       })
  //     })
  // }

  renewPost = () => {
    const db = firebase.firestore()
    const lastVisible = this.lastVisible ? this.lastVisible : false

    if(this.lastVisible) {
      return db.collection('projects')
        .orderBy('createdAt', 'desc')
        .startAfter(lastVisible)
        .limit(5)
        .get().then(documentSnapshots => {

          // getting the last visible document for pagination
          this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]

          documentSnapshots.forEach((docs) => {
            let obj = {
              ...docs.data(),
              id: docs.id
            }
            this.post.push(obj)
            this.setState(() => {
              return {
                posts: this.post,
                isLoading: false
              }
            })
          })
        })
    }
  }

  getPosts = () => {
    const uid = this.props.auth.uid
    // console.log(uid);
    
    if(uid) {

      const db = firebase.firestore()

      // getting posts of "folowing users"
      return db.collection('projects')
        .orderBy('createdAt', 'desc')
       // .limit(5)
        .get().then(documentSnapshots => {

          // getting the last visible document for pagination
          this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]

          documentSnapshots.forEach((docs) => {
            let obj = {
              ...docs.data(),
              id: docs.id
            }
            this.post.push(obj)
            this.setState(() => {
              return {
                posts: this.post,
                isLoading: false
              }
            })
          })
        })
    } else {
      return(
        <Redirect to='/signin' />
      )
    }
  }

  displayPeople = () => {
    if(this.state.style.display === "none") {
      this.setState({style:{display:"block"}})
    } else {
      this.setState({style:{display:"none"}})
    }
  }

  closeNotificationPanel = () => {
    const ref = this.notificationPanel.current
    ref.classList.add('hide')
  }

  displayNotificationPanel = () => {
    const ref = this.notificationPanel.current
    ref.classList.remove('hide')
  }

  render() {

    const { auth, profile } = this.props
    const { posts } = this.state
    const { storeId } = this.state

    // redirecting signed out users to signin/signup page
    if (!auth.uid) return <Redirect to='/signin' />

    return(
      <div>
        <div ref={this.notificationPanel} 
          className="desk_notification_wrapper hide hide-on-small-only">
          <div className="desk_notification" >
            <i onClick={this.closeNotificationPanel}
              className="material-icons close "> 
                close 
            </i>
            <Notification />
          </div>
        </div>
        <div className="navbar_wrapper">
          <Navbar onClick={this.displayNotificationPanel} />
        </div>
        <div
          className="hide-on-med-and-up mobile_navbar"
          ref={this.mobileNav}>
          <MobileNavbar profile={profile} auth={auth} storeId={storeId} />
        </div>

        <div className="dashboard container">
          <div className="row">
            {/* <div className="col l1 m1 hide-on-small-only hide-993">
              <Category auth={auth} profile={profile} storeId={storeId} />
            </div> */}
            <div className="col l5 offset-l1 m8 offset-m2 s12">
              <div className="hide-on-med-and-up" ref={this.createPost}>
              {/* <a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">Share via Whatsapp</a> */}
                <CreatePost />
                <CreatePostMobile />
              </div>
              {/*<div>
                <Album />
              </div>*/}

                  <div className="">
                    <ProjectList projects={posts} auth={auth}/>
                    <div
                      className="load_more"
                      onClick={this.renewPost}>
                      <span>
                        Load More
                        <i className="material-icons">autorenew</i>
                      </span>
                    </div>
                  </div>

            </div>
            <div className="col l4 offset-l1 hide-on-med-and-down">
              <CreatePost />
              {this.users
                ? <div>
                    <Users />
                  </div>
                : null}
            </div>
          </div>
          <div className="footer-cover">
          </div>
        </div>
      </div>
    )
    
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addUserAfterGoogleSignIn:
//   }
// }

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    projects: state.firestore.ordered.projects,
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    userStore: state.firestore.ordered.stores
  }
}

export default compose (
  firestoreConnect([
      { collection: 'projects',
        orderBy: ['createdAt', 'desc']
      }]),
  connect(mapStateToProps)
)(Dashboard)
