export const createProject = (project) => {
  console.log("content: ", project)
  return (dispatch, getState , { getFirebase, getFirestore }) => {

    // adding data to firestore
    const firestore = getFirebase().firestore()
    const profile = getState().firebase.profile // retreiving user profile info
    const userId = getState().firebase.auth.uid // accessing user's user ID
    const category = project.type ? project.type : 'other'
    const authorImage = project && project.authorImage ? project.authorImage : null
    // adding data to firestore collection named 'projects'
    firestore.collection('projects').add({
      content: project.content,
      imageUrl: project.imageUrl,
      authorName: profile.fullName,
      authorId: userId,
      authorImage,
      category,
      isActive: true,
      createdAt: new Date()
    })
    .then(() => {
      dispatch({type:'CREATE_PROJECT', project })
      window.location.reload()      
    })
    .catch((err) => {
      dispatch({type:'CREATE_PROJECT_ERR', err })
    })
  }
}

// every document that a user creates needs to be stored forever and
// should not be deleted for security reasons.
// in order for it to delete out of the users' feed
// document is written with a false statement to prevent it from
// rendering and desplaying on screen
// so document's "isActive: true" field value is changed to "false" 
export const deletePost = (docId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirebase().firestore()

    firestore.collection('projects')
      .doc(docId)
      .update({
        isActive: false
      }).then(() =>{
        window.location.reload();
      })
  }
}

export const createAlbum = (album) => {
  return (dispatch, getState, { getFirebase, getFirestore}) => {

    // console.log("createAlbum: ", album)
    const firestore = getFirebase().firestore()
    const firebase = getFirebase()
    const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid // accessing user's user ID
    const imageUrl = album.imageUrl ? album.imageUrl : null
    const dp = album.authorProfilePicture ? album.authorProfilePicture : null

    if(album.albumId) {
      console.log("isAlbumId: ", album)
      firestore.collection('albums')
        .doc(album.albumId)
        .update({
          photos: firebase.firestore.FieldValue.arrayUnion(album.imageUrl)
        })
        .then(() => {
          dispatch({type:'CREATE_PROJECT', album })
        })
        .catch((err) => {
          dispatch({type:'CREATE_PROJECT_ERR', err })
        })

    } else if(imageUrl) {
      console.log("isNewAlbum: ", album)
      firestore.collection('albums').add({
        authorName: profile.fullName,
        authorId: userId,
        albumName: album.albumName,
        content: album.content,
        photos: [album.imageUrl],
        authorImage: dp,
        isActive: true,
        time: new Date()
      })
      .then(() => {
        dispatch({type:'CREATE_PROJECT', album })
      })
      .catch((err) => {
        dispatch({type:'CREATE_PROJECT_ERR', err })
      })

    }
  }
}
