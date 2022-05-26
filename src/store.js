import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import {composeWithDevTools} from "redux-devtools-extension"
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
    apiKey: "AIzaSyDny8dZpSh1rXsaYBja5hKNb21j728z4xU",
    authDomain: "pixedit-76695.firebaseapp.com",
    projectId: "pixedit-76695",
    storageBucket: "pixedit-76695.appspot.com",
    messagingSenderId: "680763092293",
    appId: "1:680763092293:web:cc3cd2e503aeb1ef8ee22c",
    measurementId: "G-90P62RM8P1"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
//firebase.initializeApp(fbConfig)
!firebase.apps.length ? firebase.initializeApp(fbConfig) : firebase.app();

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState, composeWithDevTools())

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

//export default store;