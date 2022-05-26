import React from 'react'
import UserInfo from './UserInfo'
import SocialProfiles from './SocialProfiles'
// import Summary from './Summary'

const UserDetails = ({ profile }) => {

  let result = ''

  if(profile && profile.social) {
    if((profile.social.fb && profile.social.fb !== '/n') || (profile.social.insta && profile.social.insta !== '/n') || (profile.social.other && profile.social.other !== '/n') || (profile.social.yt && profile.social.yt !== '/n')) {
      result = <SocialProfiles profile={profile.social} />
    }
  }

  return(
    <div className="section">
      <UserInfo profile={profile} />
        {result}
    </div>
  )
}

export default UserDetails
