export const UpdateProfile = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirebase().firestore()
    const uid = getState().firebase.auth.uid

    firestore.collection('users').doc(uid)
    .update({
      ...data
    })
    .then(_ => {
      dispatch({type: 'PROFILE_UPDATE', data})
      window.location.reload()
    })
    .catch(error => {
      dispatch({type:'PROFILE_UPDATE_ERR', error})
    })
  }
}

export const updateEmail = (email) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firebase = getFirebase()
    const user = firebase.auth().currentUser

    user.updateEmail(email)
    .then(_ => {
      // alert("email successfully updated!")
      window.location.reload()
    })
    .catch(error => {
      //alert("Sorry! Something went wrong", error)
    })

  }
}
