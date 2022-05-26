import React from 'react'
import Experience from './Experience'
// import Education from './Education'

const Bio = ({profile}) => {
  return (
    <div className="bio_wrapper">
      {/*<Education />*/}
      <Experience profile={profile} />
    </div>
  )
}

export default Bio
