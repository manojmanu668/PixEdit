import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
// import 'firebase/messaging'

 // Initialize Firebase
   const config = {
    apiKey: "AIzaSyDZix2HpzsVrfT9UhSyzVdMXOwrEO67hDQ",
    authDomain: "thecolorstack.firebaseapp.com",
    databaseURL: "https://thecolorstack.firebaseio.com",
    projectId: "thecolorstack",
    storageBucket: "thecolorstack.appspot.com",
    messagingSenderId: "510882193988"
  }

  firebase.initializeApp(config);
  firebase.storage()
  firebase.firestore()
  // firebase.firestore().settings({ timestampsInSnapshots: true })
  // const messaging = firebase.messaging()

  // Notification.requestPermission()
  //   .then(_ => {
  //     console.log("got permission")
  //     return messaging.getToken()
  //   })
  //   .then(token => {
  //     console.log(token)
  //   })
  //   .catch(error => {
  //     console.log("didn't get permission", error)
  //   })

  export default firebase
