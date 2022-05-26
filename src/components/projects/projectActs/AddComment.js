import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createComment } from '../../../store/actions/CommentAction'

class AddComment extends Component {
  constructor() {
    super()
    this.state = {
      comment: '',
      commentToPost:''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    event.persist()
    let comment = this.refs.comment.value
    // console.log("id::: ",this.props.projectId)
    let { projectId } = this.props
    if(comment) {
      this.setState(() => {
        return {
          comment: this.refs.comment.value,
          commentToPost: projectId
        }
      }, () => {
        this.props.createComment(this.state)
        event.target.reset()
      })
    }
  }

  render() {
    // const projectId = this.props && this.props.projectId
    // console.log("1id: ", projectId)
    return(
      <div className="addcomment">
        <form action="" onSubmit={this.handleSubmit}>
          <input type="text" ref="comment" placeholder="add your comment..." className="" />
          <button type="submit" className="btn transparent z-depth-0"></button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (comments) => dispatch(createComment(comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
