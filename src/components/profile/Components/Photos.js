import React from 'react'

const Photos = ({artWorks}) => {
  return (
    <div className="thumbnails row masonry">
      <div className="card z-depth-0">
        { artWorks && artWorks.map(art => {
          return (
            <div className="item">
              <img
                src={art.imageUrl}
                alt="x"
                className="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Photos
