export const FollowUser = (followingDetails) => {
  return(dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirebase().firestore()
    const userId = getState().firebase.auth.uid
    const profile = getState().firebase.profile

    // storing "follwing user" data to the respective user's subcollection
    // in the name 'following'
    firestore.collection('users').doc(userId)
    .collection('following')
    .add({
      ...followingDetails,
      time: new Date()
    })
    .then(() => {
      dispatch({type: 'FOLLOWED_USER', followingDetails })

        // storing follwer data to the respective user's subcollection
        // in the name followers
        firestore.collection('users').doc(followingDetails.userid)
        .collection('followers')
        .add({
          name: `${profile.fullName}`,
          userid: userId,
          time: new Date()
        })
    })
    .catch((error) => {
      dispatch({type: 'FOLLOWING_ERROR', error})
    })
  }
}
