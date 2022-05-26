import React from 'react'

const SocialProfiles = ({profile}) => {
  return (
    <div className="card z-depth-0 white">
      <div className="social_pro_wrapper">
        <div className="summary_title">
          <span> Social </span>
        </div>
        { profile && profile.fb && profile.fb !=='\n'
          ? <div>
              <i className="fab fa-facebook-square"></i>
              <span className="value">
                <a href={profile.fb}>
                  {profile.fb}
                </a>
              </span>
            </div>
          : null
        }
        { profile && profile.insta && profile.insta !=='\n'
          ? <div>
              <i className="fab fa-instagram"></i>
              <span className="value">
                <a href={"https://www.instagram.com/"+ profile.insta}>
                  {profile.insta}
                </a>
              </span>
            </div>
          : null
        }
        { profile && profile.other && profile.other !=='\n'
        ?  <div>
            <i className="material-icons">
              link
            </i>
            <span className="value">
              <a href={profile.other}>
                {profile.other}
              </a>
            </span>
          </div>
        : null
        }
        { profile && profile.yt && profile.yt !=='\n'
          ? <div>
              <i className="fab fa-youtube"></i>
              <span className="value">
                <a href={"https://www.youtube.com"+profile.yt}>
                  {profile.yt}
                </a>
              </span>
            </div>
          : null
        }
      </div>
    </div>
  )
}

export default SocialProfiles
