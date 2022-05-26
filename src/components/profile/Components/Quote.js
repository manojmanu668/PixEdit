import React from 'react'

const Quote = ({ quote }) => {
  //console.log("quote",quote)
  return (
    <div className="quote_wrapper">
      <div className="card z-depth-0 white height210">
        <div className="quote">
          <div>
            <span className="title"> What inspires me? </span>
            <span className="content">
              { quote.content }
            </span>
            { quote && quote.author
              ? <span className="author">
                 - {quote.author}
                </span>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quote
