export const SellArt = (art) => {
    return(dispatch, getState, { getFirebase, getFirestore}) => {

        const firestore =  getFirebase().firestore()
        // const userId = getState().firebase.auth

        firestore.collection('stores').doc(art.storeId)
        .collection('sellingArts')
        .add({
            ...art.values
        })
    }
}