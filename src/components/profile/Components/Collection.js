import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import CollectionItem from './CollectionItem'

class Collection extends Component {
  constructor() {
    super()
    this.collection = []
    this.lastVisible = ''
    this.state = { }
  }

  componentWillMount() {
    this.getCollection()
  }

  // renewPost = () => {
  //   const db = firebase.firestore()
  //   const lastVisible = this.lastVisible ? this.lastVisible : false
  //
  //   if(this.lastVisible) {
  //     return db.collection('projects')
  //       .orderBy('createdAt', 'desc')
  //       .startAfter(lastVisible)
  //       .limit(5)
  //       .get().then(documentSnapshots => {
  //
  //         // getting the last visible document for pagination
  //         this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]
  //
  //         documentSnapshots.forEach((docs) => {
  //           let obj = {
  //             ...docs.data(),
  //             id: docs.id
  //           }
  //           this.post.push(obj)
  //           this.setState(() => {
  //             return {
  //               posts: this.post
  //             }
  //           })
  //         })
  //       })
  //   }
  // }

  getCollection = () => {
    const paramId = this.props.paramId

    const db = firebase.firestore()
    console.log("paramIdTop", paramId)
    console.log("auth",this.props.id)
    // getting posts of "folowing users"
    return db.collection('users').doc(paramId)
      .collection('collection')
      .orderBy('time', 'desc')
      .limit(10)
      .get().then(documentSnapshots => {

        // getting the last visible document for pagination
        this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]

        documentSnapshots.forEach((docs) => {
          let obj = {
            ...docs.data(),
            id: docs.id
          }
          this.collection.push(obj)
          this.setState(() => {
            return {
              collection: this.collection
            }
          }, () => {
            console.log("collection: ", this.state)
          })
        })
      })
    }

  render() {
    const art = this.state.collection ? this.state.collection : null
    console.log("art1: ", this.state.collection)
    console.log("paramIdArt",this.props.paramId)
    return (
      <div className="section">
        { art !== null
          ? <div>
              { art && art.map(art => {
                return (
                  <div key={art.id}>
                    { art.isActive
                      ? <CollectionItem art={art} />
                      : null }
                  </div>
                )
              })}
            </div>
          : <div className="no_post card z-depth-0 white">
              <p className="grey-text center">
                {/*<b>  Save posts to your collection and let the world see what you love! </b>
                  <br/>
                 Anyone who visits here can view your collections*/}
                 has not collected any pictures yet!
              </p>
            </div>
         }
      </div>
    )
  }
}

export default Collection
