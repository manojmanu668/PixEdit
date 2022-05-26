import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentReply } from '../../../store/actions/CommentAction'

class AddReply extends Component {
  constructor() {
    super()
    this.replyRef = React.createRef()
    this.state = { }
  }

  handleClick = (e) => {
    this.props.onClick()
    const el = e.target.closest('div')
    const targetEl = el.previousSibling
    const closeIcon = el.nextSibling

    targetEl.style.display = 'block' // reply field
    el.style.display = 'none'
    closeIcon.style.display = 'block' // close icon
  }

  removeInput = (e) => {
    const el = e.target.closest('div')
    const targetEl = el.previousSibling

    targetEl.previousSibling.style.display = 'none' // reply field
    targetEl.style.display = 'block' // reply button
    el.style.display = 'none' // close target field
  }

  handleKeyPress = (e) => {
    const { commentId } = this.props
    const replyElement = this.replyRef.current
    const message = replyElement.innerText

    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      replyElement.blur()
      if(message !== "" && message !== null && message !== undefined && message !== "\n") {
        this.setState(() => {
          return {
            replyContent: message,
            projectId: this.props.projectId,
            commentId
          }
        }, () => {
          console.log(this.state)
          replyElement.innerHTML = ""
          this.props.commentReply(this.state)
          // re-fetching replies once user submit his reply
          this.props.onClick()
        })
      }
    }
  }

  render() {
    return(
      <div className="com_rp_wrap">
        <div id="reply">
          <form className="reply">
            {/*<label htmlFor="reply"> reply </label>
            <input id="reply" type="text" placeholder="give them a reply..." />*/}
            <div>
              <div
                className="edt_wrap editable"
                contentEditable="true"
                data-placeholder="write a reply..."
                role="textbox"
                ref={this.replyRef}
                onKeyPress={this.handleKeyPress}>
              </div>
            </div>
          </form>
        </div>

        <div>
          <span
            className="repl_btn bttn"
            onClick={this.handleClick}>
              reply
          </span>
        </div>

        <div id="close_repl_btn">
          <i
            className="material-icons close_repl_btn bttn"
            onClick={this.removeInput}>
              clear
          </i>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentReply: (data) => dispatch(commentReply(data))
  }
}

export default connect(null, mapDispatchToProps)(AddReply)
