import React from 'react'

const UserInfo = ({profile}) => {
  return(
    <div className="card z-depth-0 white">
      <div className="user_info">
        <ul>
          <li>
            { profile && profile.currentCity && profile.currentCity !== '\n'
              ? <div className="clearfix">
                  <i className="material-icons"> room </i>
                  <p>
                    Lives in
                    <span className="value"> {profile.currentCity} </span>
                  </p>
                </div>
              : null }
          </li>
          <li>
            { profile && profile.hometown && profile.hometown !== '\n'
              ? <div className="clearfix">
                  <i className="material-icons"> home </i>
                  <p>
                    Home Town
                    <span className="value"> {profile.hometown} </span>
                  </p>
                </div>
              : null }
          </li>
          <li>
            { profile && profile.email && profile.email !== '\n'
              ? <div className="clearfix">
                  <i className="material-icons"> email </i>
                  <p>
                    Email
                    <span className="value"> {profile.email} </span>
                  </p>
                </div>
              : null
            }
          </li>
          <li>
            { profile && profile.phone && profile.phone !== '\n'
              ? <div className="clearfix">
                  <i className="material-icons"> phone </i>
                  <p>
                    Phone
                    <span className="value"> {profile.phone} </span>
                  </p>
                </div>
              : null }
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserInfo
