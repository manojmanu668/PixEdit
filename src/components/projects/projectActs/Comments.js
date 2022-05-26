import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentDetails from './CommentDetails'

class Comments extends Component {

  render(){
  // console.log("comments: ", comments)
    const { comments, projectId } = this.props
    // console.log("id: ", projectId)
    return(
      <div>
        <div className="loaded-comments">
          { comments && comments.length > 0
            ? <div>
                {comments && comments.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <CommentDetails
                        comment={comment}
                        projectId={projectId}/>
                    </div>
                  )
                })}
              </div>
            : <span className="no_comment">
                be the first one to comment!
              </span>
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  // console.log("state: ", state)
  return {
    // profile:
  }
}


export default connect(mapStateToProps)(Comments)
