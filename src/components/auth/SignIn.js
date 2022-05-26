import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import Navbar from '../layout/Navbar'
import { signInAction } from '../../store/actions/AuthActions'
import { signInWithGoogle, addUserAfterGoogleSignIn } from '../../store/actions/AuthActions'
import { Redirect } from 'react-router-dom'
import SignInWithProvider from './signInWithProvider'
import Intro from '../layout/Intro'
import { CircularLoader } from '../../loaders/circular'
import { upToIn } from '../../store/actions/AuthActions'
// import Lds from '../../loaders/Lds'

class SignIn extends Component {
  state = {
      email: '',
      password: '',
      isLoading: false
  }

  //()=>{window.document.title="name"}

  handleClick = () => {
    // firebase.auth().onAuthStateChanged(data => {
    //   console.log("data", data)
    //     addUserAfterGoogleSignIn()
    // })
    this.props.signInWithGoogle()
    //alert("hhhh")
  }

  componentWillMount = () => {
    // firebase.auth().getRedirectResult().then(data => {
    //   console.log("data", data)
    //   this.props.addUserAfterGoogleSignIn()
    // })
    document.title = "PixEdit"
    firebase.auth().onAuthStateChanged(user => {
      console.log("data", user)
      this.props.addUserAfterGoogleSignIn()
    })
  }

  // changing state on submitting form
  handleSubmit = (e) => {
    e.preventDefault()
    const email = this.refs.email.value
    const password = this.refs.password.value

    this.setState({isLoading: true})
    
    if(email && password) {
      this.setState(() => {
        return {
          email,
          password
        }
      }, () => {
        this.props.signIn(this.state) // passing state to the dispatch method
      })
    }
  }

  hanbleClick = () => {
    this.props.upToIn(this.state)
    //console.log('clicked',state.auth.authStatus)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.err!==this.props.err){

      this.setState({isLoading: false });
    }
  }

  // stopLoading = () => {
  //   this.setState(() => {
  //     return {
  //       isLoading: false
  //     }
  //   })
  // }

  render() {
    const { err, auth } = this.props // error message
    
    if(auth.uid) return <Redirect to='/' />
    return(
      <div>
        <title>PixEdit</title>
        <div className="full-cover">

                <Intro />

              <div className="sign_in-form">
                <form className="sign-in" onSubmit={this.handleSubmit}>
                  <div className="form-cover">
                    <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <div>
                        <i className="material-icons prefix"> email </i>
                        <input id="email" type="email" ref="email" />
                      </div>
                    </div>
                    <div className="input-field">
                      <label htmlFor="password">Password</label>
                      <div>
                        <i className="material-icons prefix"> lock </i>
                        <input id="password" type="password" ref="password" />
                      </div>
                    </div>
                    <div className="err_msg"> { err ? <p className="red-text darken-5">{err}</p> : null } </div>
                    <div className="input-field">
                      {/* { this.state && this.state.isLoading
                        ? <Lds />
                        : <button
                            className="btn grey darken-3 z-depth-0 sign-in-btn"
                            onClick={this.displayLoading}>
                            Login
                          </button>
                      } */}
                      { this.state.isLoading
                            ? <div className="cLoader"> <CircularLoader /> </div>
                            : <button
                                  className="sign-in-btn">
                                    Login
                              </button> }

                    </div>
                        <SignInWithProvider onClick={this.handleClick} />
                    <div className="ac_forgot">
                      <span onClick={this.hanbleClick}>
                        Don't have an account?
                        <Link to='signup' className="sign-in-upfont" > SignUp </Link>
                      </span>
                      <span>
                        <Link
                          to='forgotpassword'
                          className="blue-text">
                          Forgot Password?
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
      </div>
    )
  }
}

// accessing error message from the authReducer
const mapStateToProps = (state) => {
  console.log(state)
  return {
    err: state.auth.authStatus,
    auth: state.firebase.auth
  }
}

// calling dispatch attaching state
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signInAction(creds)),
    signInWithGoogle: () => dispatch(signInWithGoogle()),
    addUserAfterGoogleSignIn: () => dispatch(addUserAfterGoogleSignIn()),
    upToIn: (creds) => dispatch(upToIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
