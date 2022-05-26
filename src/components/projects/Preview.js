import React from 'react'

const Preview = ({preview}) => {
  
  // const data = preview
  // const currentImage = data[1]
  // console.log(currentImage)
  // console.log("pre: ", preview)
  return(
    <div>
      { preview.map((image, index) => {
        console.log("map: ", image)
        return(
          <div 
            className="preview" 
            key="index"
            style={{ backgroundImage: `url(${image.url})` }}>
            {/* <img
              className="responsive-img"
              src={image.url}
              alt="img"/> */}
          </div>
        )
      })}
    </div>
  )
}

export default Preview
