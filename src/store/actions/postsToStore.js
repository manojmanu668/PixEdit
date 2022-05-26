export const passPostToStore = (posts) => {
  return(dispatch, { getFirebase, getFirestore }) => {
    posts
    ? dispatch({type: 'RETRIEVE_POST', posts})
    : dispatch({type: 'RETRIEVE_POST_ERR',
      error: "error retrieving content!"})
  }
}
