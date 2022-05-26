import authReducer from './authReducer'
import projectReducer from './projectReducer'
import profileReducer from './profileReducer'
import likeReducer from './likeReducer'
import collectionReducer from './collectionReducer'
import profileUpdate from './profileUpdate'
import followReducer from './FollowReducer'
import posts from './postRetrieveReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import userReducer from '../../components/message/reducers/user.reducer'
import tabsReducer from './TabsReducer'

// combining reducers all here
const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  project: projectReducer,
  profile: profileReducer,
  posts: posts,
  likes: likeReducer,
  profileUpdate: profileUpdate,
  following: followReducer,
  collection: collectionReducer,
  user: userReducer,
  TabValue: tabsReducer
})

export default rootReducer
