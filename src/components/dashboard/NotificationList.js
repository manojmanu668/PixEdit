import React from 'react'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'

var i = 0
const NotificationList = ({notifications}) => {

  const markRead = (isRead) => {
    if(!isRead) {
      console.log("error!!!");
    }
  }

  return (
      <div>
          {notifications && notifications.map(item => {

            const name = item && item.user
            const nameArr = name.split(' ')
            let initials = ''
            if(nameArr && (nameArr[1] !== undefined)) {
              initials = `${nameArr[0][0]}${nameArr[1][0]}`
            } else if(nameArr && (nameArr[1] === undefined)) {
              initials = `${nameArr[0][0]}${nameArr[0][1]}`
            }
            i += 0.1

            // console.log(item)
            console.log(item.userImage)
            // let userImage = item.userImage
            // if(item.userImage === undefined || item.userImage === "undefined") {
            //   userImage = null
            // }
          return(
            <li key={item && item.id}
                style={{animationDelay: `${-i}s`}}
                onClick={ () => markRead(item.isRead) }>
              <Link to={`/${item.userLink}`}>
                <div className="initials">
                  { item.userImage && item.userImage !== "null" && item.userImage !== null && item.userImage !== undefined && item.userImage !== "undefined"
                    ? <img src={item.userImage} alt="user" className="responsive-img" />
                    : <div>
                        <span className="">{initials}</span>
                      </div> }
                </div>
              </Link>
              <div>
                <Link to={`/${item.contentLink}`}>
                  <span className="user"> {item.user} </span>
                  <span className="content">{" "+item.content}</span>
                  <div>
                    <span className="grey-text lighten-5 time">
                      {moment(item && item.time.toDate()).fromNow()}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="dots">
                <Link to={`/${item.contentLink}`}>
                  <i className="material-icons"> arrow_right </i>
                </Link>
              </div>
              {/* <div className="options">
                <ul>
                  <li> visit profile </li>
                  <li> view post </li>
                </ul>
              </div> */}
            </li>
          )
        })}
      </div>
  )
}

export default NotificationList
