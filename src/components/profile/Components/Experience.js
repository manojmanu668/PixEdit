import React from 'react'

const Experience = ({profile}) => {
  return (
    <div className="card z-depth-0 white">
      <div className="summary_title">
        <span> Experience </span>
      </div>
      <div className="summary_wrapper">
        <p className="summary_cont">
          {profile.experience
            ? profile.experience
            : <span> experience is not written! </span>
          }
        </p>
      </div>
    </div>
  )
}

export default Experience
