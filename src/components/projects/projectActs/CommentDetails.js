import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import AddReply from './AddReply'
import Reply from './Reply'

class CommentDetails extends Component {
  constructor() {
    super()
    this.state = {}
  }
  handleClick = () => {
    const projectId = this.props.projectId
    const commentId = this.props.comment.id
    const replies = []

    const db = firebase.firestore()
    const ref = db.collection('projects').doc(projectId)
      .collection('comments').doc(commentId)
      .collection('reply')
      .orderBy('time', 'desc')

      return ref.get().then(documentSnapshots => {
        documentSnapshots.forEach(doc => {
          // console.log("data:", doc.data())
          let obj = {
            ...doc.data(),
            id: doc.id
          }
          replies.push(obj)
        })
      })
      .then(() => {
        this.setState(() => {
          return {
            replies
          }
        }, () => {
          console.log("rep: ", this.state)
        })
      })
  }

  render() {
    const { comment, projectId } = this.props
    const { replies } = this.state
    const commentFromId = comment && comment.commentFromId ? comment.commentFromId : null
    return(
      <div
        className="comments">
        <p>
          <Link to={'/profile/' + commentFromId }>
            <span className="commentor green-text darken-1">
              {comment && comment.commentFrom}
            </span>
          </Link>
          <span className="comment_02_spn">{comment && comment.comment}</span>
        </p>
        <div>
          {comment && comment.id && projectId
            ? <AddReply
                commentId={comment.id}
                projectId={projectId}
                onClick={this.handleClick}/>
            : null}
        </div>
        <div>
          <Reply replies={replies}/>
        </div>
      </div>
    )
  }
}

export default CommentDetails
