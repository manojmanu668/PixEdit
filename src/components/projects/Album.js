import React from 'react'
import wall from '../../static/wall.jpg'
import coffee from '../../static/coffee.jpg'
import unreal from '../../static/unreal.jpg'
import cover from '../../static/cover.jpg'
import photo from '../../static/photo.jpg'
import sketch from '../../static/sketch.jpg'
import table from '../../static/table.jpg'

export const Album = () => {
  const images = [wall, coffee, photo, unreal, cover, sketch, photo, table]

  const handleClick = (e) => {
    // e.target.classList.add('make_large')
  }

  return(
    <div className="masonry_wrapper section">
      <div className="card z-depth-0">
        {images.map((image, index) => {
          return (
            <section
              className="masonry"
              key={index}>
              <img
                src={image}
                alt="img"
                className="responsive-img"
                onClick={handleClick}/>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default Album
