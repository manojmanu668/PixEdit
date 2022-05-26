import firebase from 'firebase/app'
import 'firebase/firestore'

export var dataObj
export const getLikes = (projectId, authorId) => {

  const db = firebase.firestore()
  const ref = db.collection('projects').doc(projectId)
    .collection('likes')
    .where('likeFromId', '==', authorId)

  return ref.get().then((documentSnapshots) => {
    documentSnapshots.forEach(doc => {
      const id = doc.id ? doc.id : null
      // console.log(`get: ${projectId}`, doc.data())

      dataObj = {
        ...doc.data(),
        id: id
      }
    })
  })
}
