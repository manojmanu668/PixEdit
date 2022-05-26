import React, { Component } from 'react'
import { connect } from 'react-redux'
import { recoverPassword } from '../../store/actions/AuthActions'

class ForgotPassword extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleSubmit = (e,) => {
    e.preventDefault()
    const email = this.refs.email.value
    // console.log("email: ", email)
    this.setState(() => {
      return{
        email: email
      }
    }, () => {
      this.props.recoverPassword(this.state)
    })
  }

  render() {
    const auth = this.props && this.props.authStatus
    return(
      <div className="container email password_recovery">
        <div className="row">
          <form
            onSubmit={this.handleSubmit} 
            className="col l6 offset-l3 white">
            <div className="input-field">
              <label htmlFor="email"> Enter your Email to recover password </label>
              <input ref="email" id="email" type="email" placeholder="Email" />
            </div>
            <p className="grey-text lignten-5">
              Password recovery link will be sent to your email-id
            </p>
            {
              auth && auth.isSuccessful
              ? <div className="green-text">
                  {auth && auth.message}
                </div>
              : <div className="red-text">
                  {auth && auth.message}
                </div>
            }
            <button
              type="submit" 
              className="btn z-depth-0">
                Verify
              </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    authStatus: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    recoverPassword: (email) => dispatch(recoverPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
