import React from 'react'
import { Link } from 'react-router-dom'

const MobileNavbar = (props) => {

  // const displayPeople = () => {
  //   props.onClick()
  // }
  const { profile, auth} = props
  const userImage = profile && ( profile.imageUrl || profile.avatarUrl) ? ( profile.imageUrl || profile.avatarUrl) : null
  const id = auth.uid
  return (
    <div className="mobile_nav_wrapper">

        <ul>
          <li>
            <Link to='/'>
              <i className="material-icons">
                home
              </i>
            </Link>
          </li>
          <li>
            <Link to='/people'>
              <i className="material-icons">
                people
              </i>
            </Link>
          </li>
          {/* <li>
            { storeId
              ? <Link to={'/store/' + storeId}>
              <i className="material-icons">
              store
                  </i>
                </Link>
                : <Link to={'/createtore'}>
                <i className="material-icons">
                store
                  </i>
                  </Link>  
                }
          </li> */}
          <li>
            <Link to={'/notifications'}>
              <i className="material-icons">
                flash_on
              </i>
            </Link>
          </li>
          <li className="user_ic">
            <Link to={'/profile/' + id}>
              { userImage !== null
                ? <img
                    src={userImage}
                    className="btn btn-floating transparent z-depth-0"
                    alt="dp"
                    height="24px"
                    width="24px" />
                : <i className="material-icons">
                    person
                  </i> }
            </Link>
          </li>
        </ul>

    </div>
  )
}


export default MobileNavbar
