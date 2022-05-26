export const createLike = (like) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirebase().firestore()
    const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid
    console.log("action: ", like)
    const projectId = like.likeToPost
    // let likeCount = like.likeCount + 1

    firestore.collection('projects').doc(projectId)
    .collection('likes')
    .add({
      likeToPost: like.likeToPost,
      likeFromId: userId,
      likeFrom: `${profile.fullName}`,
      likeTime: new Date(),
      isActive: true
    })
    .then(() => {
      dispatch({type: 'CREATE_LIKE', like})
        firestore.collection('projects').doc(projectId)
        .update({
          likeCount: like.likeCount + 1
        })
    })
    .catch((error) => {
      dispatch({type: 'CREATE_LIKE_ERROR', error})
    })
  }
}

export const removeLike = (like) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirebase().firestore()
    const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid
    console.log("action: ", like)
    const projectId = like.likeToPost
    // let likeCount = like.likeCount + 1

    firestore.collection('projects').doc(projectId)
    .collection('likes').doc(like.id)
    .update({
      likeToPost: like.likeToPost,
      likeFromId: userId,
      likeFrom: `${profile.fullName}`,
      likeTime: new Date(),
      isActive: false
    })
    .then(() => {
      dispatch({type: 'REMOVE_LIKE', like})
        firestore.collection('projects').doc(projectId)
        .update({
          likeCount: like.likeCount - 1
        })
    })
    .catch((error) => {
      dispatch({type: 'REMOVE_LIKE_ERROR', error})
    })
  }
}

export const updateLike = (like) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirebase().firestore()
    const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid
    // console.log("action: ", like)
    const projectId = like.likeToPost
    // let likeCount = like.likeCount + 1

    firestore.collection('projects').doc(projectId)
    .collection('likes').doc(like.id)
    .update({
      likeToPost: like.likeToPost,
      likeFromId: userId,
      likeFrom: `${profile.fullName}`,
      likeTime: new Date(),
      isActive: true
    })
    .then(() => {
      dispatch({type: 'UPDATA_LIKE', like})
        firestore.collection('projects').doc(projectId)
        .update({
          likeCount: like.likeCount + 1
        })
    })
    .catch((error) => {
      dispatch({type: 'UPDATA_LIKE_ERROR', error})
    })
  }
}
