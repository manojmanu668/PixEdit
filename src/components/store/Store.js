import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
// import MobileNavbar from '../layout/MobileNavbar'
// import StoreIntro from './StoreIntro'
import StoreProfile from './StoreProfile'

class Store extends Component {

    render() {
        // console.log(auth)
        const { auth, store, sellingArts } = this.props
        const storeObj = store && store[0]
        return (
            <div className="store_wrapper">
                <StoreProfile auth={auth} storeObj={storeObj} sellingArts={sellingArts} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        auth: state.firebase.auth,
        store: state.firestore.ordered.stores,
        sellingArts: state.firestore.ordered.sellingArts
    }
}

export default compose(
    firestoreConnect(props => {
        // console.log("props", props)
        return [
            {
                collection: 'stores',
                doc: props.match.params.id
            },
            {
                collection: 'stores',
                doc: props.match.params.id,
                subcollections: [
                    { collection: 'sellingArts' }
                ],
                storeAs: 'sellingArts'
            }
        ]
    }),
    connect(mapStateToProps)
)(Store)