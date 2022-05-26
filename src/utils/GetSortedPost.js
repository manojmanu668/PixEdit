import firebase from 'firebase/app'
import 'firebase/firestore'

export const allPosts = []
export const getData = () => {
    const firestore = firebase.firestore()
    const atFirstCall = firestore.collection('projects')
      .orderBy('createdAt', 'desc')
      .limit(5)

      return atFirstCall.get().then((documentSnapshots) => {
        // Get the last visible document
        // console.log("test")
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        // console.log("last", documentSnapshots);
        documentSnapshots.forEach(doc => {
          let obj = {
            ...doc.data(),
            id: doc.id
          }
          allPosts.push(obj)
        })
        // Construct a new query starting at this document,
        // get the next 25 cities.
        // var next = db.collection("cities")
        //     .orderBy("population")
        //     .startAfter(lastVisible)
        //     .limit(25);

      })
      .then(() => {
        // dispatch({type: 'RETRIEVE_POST', allPosts})
        // console.log("this", allPosts)
      })
      .catch(error => {
        // dispatch({type: 'RETRIEVE_POST_ERR',
        //   error: "error retrieving content!"})
        console.log("something went wrong! Please refresh the page", error)
      })
}
