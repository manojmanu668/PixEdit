export const addCollection = (post) => {
  return(dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirebase().firestore()
    const userId = getState().firebase.auth.uid
    const postId = post.postId

    firestore.collection('users').doc(userId)
    .collection('collection')
    .add({
      imageUrl: post.imageUrl,
      postId: post.postId,
      isActive: true,
      authorId: post.authorId,
      authorName: post.authorName,
      time: new Date()
    })
    .then(() => {
      dispatch({type: 'ADD_COLLECTION', post})

      firestore.collection('projects').doc(postId)
      .collection('collected')
      .add({
        userId: userId
      })
    })
    .catch((error) => {
      dispatch({type: 'ADD_COLLECTION_ERROR', error})
    })
  }
}

export const disableCollection = (data) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirebase().firestore()
    const userId = getState().firebase.auth.uid
    const { docId } = data

    firestore.collection('users').doc(userId)
      .collection('collection').doc(docId)
      .update({
        imageUrl: data.imageUrl,
        postId: data.postId,
        isActive: false,
        authorId: data.authorId,
        authorName: data.authorName,
        time: new Date()
      })
  }
}

export const updateCollection = (data) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirebase().firestore()
    const userId = getState().firebase.auth.uid
    const { docId } = data

    firestore.collection('users').doc(userId)
      .collection('collection').doc(docId)
      .update({
        imageUrl: data.imageUrl,
        postId: data.postId,
        isActive: true,
        authorId: data.authorId,
        authorName: data.authorName,
        time: new Date()
      })
  }
}
