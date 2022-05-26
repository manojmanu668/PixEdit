import React, { Component } from 'react'
// import { firestoreConnect } from 'react-redux-firebase'
// import { compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { createLike, removeLike, updateLike } from '../../../store/actions/LikeActions'
import { addCollection, disableCollection, updateCollection } from '../../../store/actions/Collection'

class PostCerdits extends Component {
  constructor() {
    super()
    this.clickCount = 0
    this.singleClickTimer = ''
    this.state = {}
  }

  componentWillMount(props) {
    this.getLike() // getting like data
    this.getCollection() // collection data
  }

  // getting art collection list
  getCollection = () => {
    const postId = this.props.project.id
    const { uid } = this.props.auth
    let obj = {}

    const db = firebase.firestore()
    const ref = db.collection('users').doc(uid)
      .collection('collection')
      .where("postId", "==", postId)

      return ref.get().then(documentSnapshots => {
        documentSnapshots.forEach(doc => {
          // console.log("dc: ", doc.data())
          obj = {
            ...doc.data(),
            id: doc.id
          }
          // console.log("tst: ", obj)
        })
      }).then(() => {
        this.setState(() => {
          return{
            collection: {
              ...obj
            }
          }
        }, () => {
          // console.log("actv: ", this.state.collection)
        })
      })
  }

    // collection actions
    addCollection = () => {
      let collectedCount = this.props.collected + 1
      let check = this.state.collection.postId ? true : false
      let { isActive } = this.state.collection


      this.clickCount++
      if(this.clickCount === 1) {
        this.singleClickTimer = setTimeout(() => {
          this.clickCount = 0;

          check
          ? isActive
            ? this.setState(() => {
              return {
                collection: {
                  docId: this.state.collection.id,
                  imageUrl: this.props.project.imageUrl,
                  postId: this.props.project.id,
                  authorId: this.props.project.authorId,
                  authorName: this.props.project.authorName,
                }
              }
            }, () => {
              this.props.disableCollection(this.state.collection)
              this.getCollection()
              // console.log("disable col: ", this.state.collection)
            })
            : this.setState(() => {
              return {
                collection: {
                  docId: this.state.collection.id,
                  imageUrl: this.props.project.imageUrl,
                  postId: this.props.project.id,
                  authorId: this.props.project.authorId,
                  authorName: this.props.project.authorName,                }
              }
            }, () => {
              this.props.updateCollection(this.state.collection)
              this.getCollection()
              // console.log("updt col: ", this.state.collection)
            })
          : this.setState(() => {
              return {
                imageUrl: this.props.project.imageUrl,
                postId: this.props.project.id,
                collectedCount,
                authorId: this.props.project.authorId,
                authorName: this.props.project.authorName,
              }
            }, () => {
              this.props.addCollection(this.state)
              this.getCollection()
              // console.log("crt col: ", this.state.collection)
            })
        }, 400)
      }
    }

  // getting "like" data
  getLike = () => {
    const projectId = this.props.project.id
    const authorId = this.props.auth.uid
    let dataObj = {}

    const db = firebase.firestore()
    const ref = db.collection('projects').doc(projectId)
      .collection('likes')
      .where('likeFromId', '==', authorId)

    return ref.get().then((documentSnapshots) => {
      documentSnapshots.forEach(doc => {
        const id = doc.id ? doc.id : null
        console.log(`like: ${projectId}`, doc.data())

        dataObj = {
          ...doc.data(),
          id: id
        }
      })
    })
    .then(() => {
      this.setState({
        like: {
          ...dataObj
        }
      })
    })
  }

  // incrementing like to the post
  handleLike = (e) => {
    this.clickCount++
    // preventing double click event from executing
    if(this.clickCount === 1) {
      this.singleClickTimer = setTimeout(() => {
        this.clickCount = 0;

        let likes = this.props.likeCount
        console.log("like count: ", likes)
        let isExist = this.state && this.state.like && this.state.like.likeFromId ? true : false
        let likeObj = this.state.like
        let isLiked = likeObj && likeObj.isActive ? true : false
        // console.log("like state: ", isExist)


        isExist // if user ever liked this post
        ? isLiked // if like is still active
          ? this.setState(() => {
              return {
                like: {
                  likeToPost: this.props.project.id,
                  likeCount: likes,
                  id: likeObj.id
                }
              }
            }, () => {
              // console.log("remove", this.state.like)
              this.props.removeLike(this.state.like)
              this.getLike()
              .then(() => {
                // console.log("remove", this.state)
              })
            })

          : this.setState(() => {
              return {
                like: {
                  likeToPost: this.props.project.id,
                  likeCount: likes,
                  id: this.state.like.id
                }
              }
            }, () => {
              // console.log("update", this.state.like)
              this.props.updateLike(this.state.like)
              this.getLike()
              .then(() => {
                // console.log("update", this.state)
              })
            })

        : this.setState(() => {
            return {
              like: {
                likeToPost: this.props.project.id,
                likeCount: likes,
                isActive: true
              }
            }
          }, () => {
            // console.log("create", this.state.like)
            let like = this.state && this.state.like ? this.state.like : null
            this.props.createLike(like)
            this.getLike()
            .then(() => {
              // console.log("create", this.state)
            })
          })
        }, 400)

    }
  } // end of getting "like" data


  render() {
    // const { likeCount } = this.props
    const { like } = this.state
    const liked = like && like.isActive ? true : false
    // console.log("state: ", this.state)
    const { collection } = this.state && this.state
    const isCollected = collection && collection.isActive ? true : false

    return(
      <div className="icons-wrapper">

        <div className="post-act">
          <span className="">
            <button onClick={this.handleLike}>
              {liked
                ? <i className="material-icons blue-text">thumb_up</i>
                : <i className="material-icons before">thumb_up</i>}
            </button>
          </span>
          <span className="">
            {/* <button>
              <i className="material-icons before">send</i>
            </button> */}
            <button onClick={this.addCollection}>
              {isCollected
                ? <i className="material-icons center blue-text darken-4"
                     title="add to your collection">
                   collections_bookmark
                 </i>
                : <i className="material-icons center before"
                     title="add to your collection">
                   collections_bookmark
                 </i>}
            </button>
          </span>
        </div>

        <span className="like_conts_wrapper">
          {/*likeCount
            ?
              <div className="counts">
                <span className="like-count">
                  {likeCount} likes
                </span>
              </div>
            : null
          */}
        </span>

        {/* <div className="save">
          <span className="">
            <button onClick={this.addCollection}>
              {isCollected
                ? <i className="material-icons center blue-text darken-4"
                     title="add to your collection">
                   collections_bookmark
                 </i>
                : <i className="material-icons center before"
                     title="add to your collection">
                   collections_bookmark
                 </i>}
            </button>
          </span>
        </div> */}

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createLike: (like) => dispatch(createLike(like)),
    removeLike: (like) => dispatch(removeLike(like)),
    updateLike: (like) => dispatch(updateLike(like)),
    addCollection: (post) => dispatch(addCollection(post)),
    disableCollection: (data) => dispatch(disableCollection(data)),
    updateCollection: (data) => dispatch(updateCollection(data))
  }
}


export default connect(null, mapDispatchToProps)(PostCerdits)
