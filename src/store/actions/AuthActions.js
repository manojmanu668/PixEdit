import { getFirebase } from 'react-redux-firebase'

export const signInAction = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    let firebase = getFirebase() // initializing firebase

    // calling dispatch after passing credentials to firebase
    // and loggin user in
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then((data) => {
      dispatch({ type: 'LOGIN_SUCCESS' })
      console.log(data);

      const db = firebase.firestore();
      db.collection('users')
      .doc(data.user.uid)
      .update({
          isOnline: true
      })
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
  }
}

// logging user out
export const signOutAction = (uid) => {
  return(dispatch, getState, {getFirebase}) => {
    let firebase = getFirebase() // initializing firebase
    //const firestore = getFirebase().firestore()
    let db = firebase.firestore()
    
    // db.collection('users')
    // .doc(uid)
    // .update({
    //     isOnline: false
    // }).then(() => {
      console.log("signout online")
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      })
  // })
  .catch(error => {
      console.log('signout online err',error.message)
  })
    // dispatch is called from onclick on logout
    
  }
}

// user signup storing user data into firebase
export const signUpAction = (newUser) => {
  return(dispatch, getState, {getFirebase}, getFirestore) => {
    let firebase = getFirebase() // initializing firebase
    let firestore = getFirebase().firestore()
    let email = newUser.email
    let val = email.split("@")
    let username = val[0]
    let isOnline

    // creating new user passing user details
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      firestore.collection('users').doc(resp.user.uid).set({
        fullName: newUser.fullName,
        email: newUser.email,
        username,
        isOnline: true,
        time: new Date()
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCESS' })
    }).catch((err) => {
      dispatch({type: 'SIGNUP_ERROR', err })
    })
  }
}

export const recoverPassword = (email) => {
  return (dispatch, getState, {getFirebase} ) => {
    const firebase = getFirebase()
    const auth = firebase.auth()
    const emailId = email.email

    auth.sendPasswordResetEmail(emailId)
    .then(() => {
      dispatch({ type:'RESET_LINK_SENT', email })
    })
    .catch((error) => {
      dispatch({ type:'RESET_LINK_ERROR', error })      
    })
  }
}

export const signInWithGoogle = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    // const firestore = getFirestore()

    const provider = new firebase.auth.GoogleAuthProvider()

    // firebase.auth().signInWithPopup(provider)
    firebase.auth().signInWithRedirect(provider)
    // .then(user => console.log("what?",user))

    // firebase.auth().getRedirectResult().then((result) => {
    //   // TODO: check if user has a profile picture already
    //   // existed and don't put google user profile picture
    //   // if so
    //   console.log("result: ", result)
    //   console.log("email: ", result.email)
    //
    //   const user = result.user
    //   const fullName = user.displayName
    //   const finalName = fullName.split(" ")
    //   const firstname = finalName[0]
    //   const lastname = finalName[1]
    //   const url = user.photoURL
    //
    //   const val = result.email.split("@")
    //   const username = val[0]
    //
    //   firestore.collection('users').doc(user.uid).set({
    //     fullName: fullName,
    //     username,
    //     initials: `${firstname[0]}${lastname[0]}`,
    //     pictureUrl: url
    //   })
    //   .then(() => {
    //     dispatch({ type: 'SIGNUP_SUCESS' })
    //     console.log("success adding user!", `${firstname[0]} ${lastname[1]}`)
    //   }).catch((err) => {
    //     dispatch({type: 'SIGNUP_ERROR', err })
    //   })
    //
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   console.log("google errorCode: ", errorCode)
    //
    //   const errorMessage = error.message;
    //   console.log("google err: ", errorMessage)
    //   // The email of the user's account used.
    //   const email = error.email;
    //   console.log("google mail: ", email)
    //   // The firebase.auth.AuthCredential type that was used.
    //   const credential = error.credential;
    //   console.log("google cred: ", credential)
    // })
  }
}

export const addUserAfterGoogleSignIn = () => {
  // console.log("1 fired")
  return(dispatch, getState, {getFirebase,getFirestore}) => {
  // console.log("2 fired")
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()

    firebase.auth().getRedirectResult().then((result) => {
      // TODO: check if user has a profile picture already
      // existed and don't put google user profile picture
      // if so
      // console.log("result1: ", result.user.email)
      // console.log("result2: ", result.user.displayName)
      // console.log("result3: ", result.user.uid)

      const user = result.user
      const val = user.email.split("@")
      const username = val[0]

      const fullName = user.displayName

      firestore.collection('users').doc(user.uid).set({
        username: username,
        fullName
      }, {merge: true})
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCESS' })
        console.log("success adding user!", result.user.displayName)
      }).catch((err) => {
        dispatch({type: 'SIGNUP_ERROR', err })
      })

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("google errorCode: ", errorCode)

      const errorMessage = error.message;
      console.log("google err: ", errorMessage)
      // The email of the user's account used.
      const email = error.email;
      console.log("google mail: ", email)
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log("google cred: ", credential)
    })
  }
}


// export const googleSignIn = () => {
//   return(dispath, getState, { getFirebase, getFirestore}) => {

//   }
// }
export const upToIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    let firebase = getFirebase() // initializing firebase

    // calling dispatch after passing credentials to firebase
    // and loggin user in
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
    }).catch((err) => {
      dispatch({ type: 'UPTOIN', err })
    })
  }
}