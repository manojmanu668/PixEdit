import React from 'react'
import google from '../../static/icons/google.png'
// import { CircularLoader } from '../../loaders/circular'
// let isLoading = false

const SignInWithProvider = (props) => {

  function fireGoogle() {
    // isLoading = true
    props.onClick()
  }
  // function fireFacebook() {
  // alert("Works")
  // }

  return(
    <div>
      <div className="input-field g-signin provider_signin">
        {/* { isLoading
          ? <div className="cLoader"> <CircularLoader /> </div>
          : <div className="btn white darken-4 black-text google-btn"
              onClick={fireGoogle}>
              <div className="left">
                <img src={google} alt="google" width="32px" height="32px" />
              </div>
              Google
            </div> } */}
          <div className="btn white darken-4 black-text google-btn"
                onClick={() => fireGoogle()}>
                <div className="left">
                  <img src={google} alt="google" width="32px" height="32px" />
                </div>
              Google
          </div>
      </div>
      {/*
        <div className="input-field fb-signin provider_signin">
          <span className="btn z-depth-0 sign-in-btn"
            onClick={fireFacebook}>
            <span>
              <i className="fab fa-facebook"></i>
            </span>
            <button>Signin With Facebook</button>
          </span>
        </div>
        */}
    </div>
  )
}

export default SignInWithProvider
