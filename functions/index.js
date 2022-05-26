const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// creating new collection "notifications" to store activity of user's project creation
const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log("notification doc created", doc))
})


// retreiving data of new projects created
// notify users on new document creation
exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    console.log("project onCreate", doc.data())
    const projectData = doc.data() // retreiving newly created document's data
    const projectId = doc.id
    const notificationContent = {
      content: 'Added a new post',
      user: `${projectData.authorName}`,
      contentLink: `projectdetails/${projectId}`,
      userLink: `profile/${projectData.authorId}`,
      userImage: `${projectData.authorImage}` || null,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notificationContent)
  })

// retreiving data of the new user
// this will notify new users
exports.userJoined = functions.auth.user()
  .onCreate(snap => {

    console.log("snap", snap)
    // getting indivisual document belongs to the newly created user to get data
    return admin.firestore().collection('users')
      .doc(snap.uid).get()
      .then(doc => {

        console.log("user doc 1", doc.data())
        console.log("user doc 2", doc)
        const userId = snap.uid
        const userData = doc.data() // retreiving newly created user-data from the document
        const userName = `${userData.fullName}` || `${userData.displayName}`
        let userImage = `${userData.avatarUrl}` || `${snap.photoURL}` || null

        if(userImage === undefined || userImage === "undefined") {
          userImage = null
        }

        const notificationContent = {
          content: "joined the club",
          user: userName,
          contentLink: `profile/${userId}`,
          userLink: `profile/${userId}`,
          userImage,
          time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notificationContent)
      })
  })
