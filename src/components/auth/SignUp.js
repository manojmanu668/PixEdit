import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { signUpAction } from '../../store/actions/AuthActions'
// import logo from '../../static/logohome.png'
import Intro from '../layout/Intro'
import { CircularLoader } from '../../loaders/circular'

class SignUp extends Component {
  // initializing state
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    isLoading: false,
    //authStatus: ''
  }


  handleSubmit = (e) => {
    e.preventDefault()
    const fullname = this.refs.fullname.value
    // const nameArr = fullname.split(" ")
    // const firstName = nameArr[0]
    // const lastName = nameArr[1]

    if(fullname) {
      this.setState({isLoading: true })

      this.setState(() => {
        return {
          fullName: fullname,
          email: this.refs.email.value,
          password: this.refs.password.value
        }
      }, () => {
        // console.log(this.state)
        this.props.signUp(this.state)
      })    
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.err!==this.props.err){

      this.setState({isLoading: false })
    }
  }

  render() {

    const { auth, err } = this.props // getting uid from props
    console.log("click in signUp",this.props.err)
    // redirecting signedIn user to home page
    if(auth.uid) return <Redirect to='/' />

    return(
      <div>
        <div className="full-cover">
          <Intro />

            <div className="sign_in-form">
              <div className="form-cover">
                <form className="sign-up sign-in" onSubmit={this.handleSubmit}>

                  <div className="input-field">
                    <label htmlFor="full_name">Full Name</label>
                    <div>
                      <i className="material-icons prefix"> person </i>
                      <input id="full_name" type="text" ref="fullname" required />
                    </div>
                  </div>
                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <div>
                      <i className="material-icons prefix"> email </i>
                      <input id="email" type="email" ref="email" required />
                    </div>
                  </div>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <div>
                      <i className="material-icons prefix"> lock </i>
                      <input id="password" type="password" ref="password" required />
                    </div>
                  </div>
                  <div className="input-field signup_btn_link">
                  { this.state.isLoading
                        ? <div className="cLoader"> <CircularLoader /> </div>
                        : <button
                              className="sign-in-btn">
                                Sign Up
                          </button> }
                    <span>
                      Have an account?
                      <Link to='signin'>
                        &nbsp; Sign In
                      </Link>
                    </span>
                  </div>
                  <div className="auth-err">
                    { err ? <p className="red-text center"> { err } </p> : null }
                  </div>
                </form>
              </div>
            </div>

        </div>
      </div>
    )
  }
}

// imoprting authentication user id from firebase to store
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    err: state.auth.authStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUpAction(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
