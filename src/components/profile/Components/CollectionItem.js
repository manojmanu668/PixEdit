import React from 'react'
import { Link } from 'react-router-dom'

const CollectionItem = ({art}) => {

  const name = art && art.authorName
  const nameArr = name.split(' ')
  
  let initials = ''
  if(nameArr && (nameArr[1] !== undefined)) {
    initials = `${nameArr[0][0]} ${nameArr[1][0]}`
  } else if(nameArr && (nameArr[1] === undefined)) {
    initials = `${nameArr[0][0]} ${nameArr[0][1]}`
  }

  return(
    <div className="card z-depth-0 white user_collection">
    
      <Link to={art.authorId} className="black-text">
        <span className="col_username">
          <div className="btn z-depth-0 user-indicator">
            <span>
              {initials}
            </span>
          </div>
          <span className="user_name">
            {name}
          </span>
        </span>
      </Link>
      <div className="devider"></div>

      <img
        src={art.imageUrl}
        alt="your collection"
        className="responsive-img"/>

      <span className="goto">
        <Link to={`../projectdetails/${art.postId}`}>
          <i className="material-icons">
            arrow_forward
          </i>
        </Link>
      </span>

    </div>
  )
}

export default CollectionItem
