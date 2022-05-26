export const createStore = (store) => {
    return(dispatch, getState, { getFirebase, getFirestore}) => {

        const firestore =  getFirebase().firestore()
        const ownerId = getState().firebase.auth
        const profile = getState().firebase.profile

        firestore.collection('stores')
        .add({
            ...store,
            ownerId: ownerId.uid
        })
        .then(_ => {
            window.location.href="/"
            
        })
    }
}