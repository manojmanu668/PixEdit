import React from 'react'
import image from '../../static/wall.jpg'

export const ShowImage = () => {
    return (
        <div>
            <img src={image} alt="overview" />
        </div>
    )
}