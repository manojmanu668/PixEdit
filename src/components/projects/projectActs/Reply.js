import React from 'react'

const Reply = ({ replies }) => {
  return(
    <div>
      {/*<span className="green-text"> Google Chrome </span>
      <span> Yeah, that's so nice! </span>*/}
      {replies && replies.map((reply) => {
          return(
            <div
              className="replies"
              key={reply.id}>
              <span className="green-text"> {reply.replyFrom} </span>
              <span className="reply_cont"> {reply.replyContent} </span>
            </div>
          )
        })}
    </div>
  )
}

export default Reply
