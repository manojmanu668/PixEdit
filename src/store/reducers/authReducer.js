// initializing store
const initState = {
  auth: null
}

// changing store after dispatch is called
const authReducer = (state = initState, action) => {
  // handling cases of singing in
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log("login error")
      return {
        ...state,
        //authStatus: "Email or Password you entered is incorrect!"
        authStatus: action.err.message,
        //authStatus: ''
      }
    case 'LOGIN_SUCCESS':
      console.log("Login Success")
      return {
        ...state,
        authStatus: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log("signout success")
      return state
    case 'SIGNUP_SUCESS':
      console.log("signup success")
      return {
        ...state,
        authStatus: null,
      }
    case 'SIGNUP_ERROR':
      console.log("signup error")
      return {
        ...state,
        authStatus: action.err.message
      }
    case 'RESET_LINK_SENT':
      return {
        ...state,
        isSuccessful: true,
        message: "Password rest link has been sent!"
      }
    case 'RESET_LINK_ERROR':
      return {
        ...state,
        isSuccessful: false,
        message: "This email is not registered with us!",
        errorMessage: action.error 
      }
    case 'UPTOIN':
      console.log("UPTOIN")
      return {
        ...state,
        //authStatus: "Email or Password you entered is incorrect!"
        //authStatus: action.err.message,
        authStatus: ''
      }
    default:
      return state
  }
}

export default authReducer
