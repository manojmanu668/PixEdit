import firebase from 'firebase/app'
import 'firebase/firestore'

export const replies = []
export const getReplies = (projectId, commentId) => {

  const db = firebase.firestore()
  const ref = db.collection('projects').doc(projectId)
    .collection('comments').doc(commentId)
    .collection('reply')
    .orderBy('time', 'desc')

    return ref.get().then(documentSnapshots => {
      documentSnapshots.forEach(doc => {
        console.log("data:", doc.data())
        let obj = {
          ...doc.data(),
          id: doc.id
        }
        replies.push(obj)
      })
    })
    .then(() => {
      console.log("replies: ", replies)
    })
    .catch(error => {
      console.log("error retrieving data!", error)
    })
}
