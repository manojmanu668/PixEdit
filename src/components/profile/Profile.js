import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import MobileNavbar from '../layout/MobileNavbar'
import ProfileNav from './Components/ProfileNav'
import ProfileContent from './ProfileContent'
import EditProfile from './Components/EditProfile'
import Users from '../dashboard/Users'
import MessageNavBar from '../dashboard/MessageNavBar'

class Profile extends Component {
  constructor() {
    super()
    this.mobileNav = React.createRef()
    this.state = {
      style: {
        display: 'none'
      },
      peopleStyle: {
        display: "none"
      }
    }
  }

  // hide edit profile modal
  closeModal = () => {
    this.setState({style:{display: 'none'}})
  }

  // display edit profile modal
  displayModal = () => {
    this.setState({style:{display: 'block'}})
  }

  displayPeople = () => {
    // const ref = this.mobileNav.current
    // const target = ref.nextSibling
    // console.log(target)
    if(this.state.peopleStyle.display === "none") {
      this.setState({peopleStyle:{display:"block"}})
    } else {
      this.setState({peopleStyle:{display:"none"}})
    }
  }

  render() {
    const { auth, profile, artWorks, users } = this.props
    const paramId = this.props.match.params.id
    console.log('log auth',auth)

    return(
      <div>
        <div>
          {/* className="hide-on-med-and-up mobile_navbar"
          ref={this.mobileNav}>
          <MobileNavbar auth={auth} onClick={this.displayPeople} /> */}
         
        </div>
        <div
          className="mobile_user_wrapper"
          style={this.state.peopleStyle}>
          <div className="mobile_user">
            <Users users={users} />
          </div>
        </div>
        <div className="profile-wrapper profile">
          <div style={this.state.style}>
            <EditProfile
            auth={auth}
            profile={profile}
            onClick={this.closeModal}/>
          </div>
          <div className="picture_basic">
            <div className="navbar">
              { auth && profile
                ?  <MessageNavBar/>
                : null }
            </div>
            <div className="container">
              <div className="row">

                <div className="col l12 m12 s12">
                  <ProfileContent
                    profile={profile}
                    auth={auth}
                    paramId={paramId}
                    artWorks={artWorks}
                    onClick={this.displayModal}/>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const profileStore = state.firestore.ordered.userProfile
  const profile = profileStore ? profileStore[0] : null
  // console.log("profile1: ", state)
  // console.log(state)
  return {
    auth: state.firebase.auth,
    profile: profile,
    users: state.firestore.ordered.users,
    artWorks: state.firestore.ordered.artWork,
  }
}

export default compose (
  firestoreConnect(props => {
    return [
      { collection: 'projects',
        orderBy: ['createdAt', 'desc'],
        where: [
          ['authorId', '==', props.match.params.id]
        ],
        storeAs: 'artWork'},

      { collection: 'users',
        doc: props.match.params.id,
        storeAs: 'userProfile'},
      { collection: 'users' }
    ]
  }),
  connect(mapStateToProps)
)(Profile)

// export default Profile
