import React, { Component } from 'react'

import blackink from '../../static/blackink.jpg'
import coffee from '../../static/coffee.jpg'
import photo from '../../static/photo.jpg'
import table from '../../static/table.jpg'
import sketch from '../../static/sketch.jpg'
import unreal from '../../static/unreal.jpg'

class Arts extends Component {
    constructor() {
        super()
        this.state = {
            // arts: [blackink, coffee, photo, table, sketch, unreal],
        }
    }

    displayImage = (art, title, description) => {
        this.props.onClick(art, title, description)
    }

    render() {
        const { arts, auth, storeOwnerId } = this.props
        console.log("auth, store: ", auth, storeOwnerId);
        
        return (
            <div>
                { arts && arts.map((art, index) => {
                    return (
                        <div
                            key={art.id} 
                            className="img_cover">
                            <div key={index}
                                className="img"
                                style={{ backgroundImage: `url(${art.image})` }}
                                onClick={() => this.displayImage(art.image, art.title, art.description)}>
                                <div>  <span className="art_mes"> {`${art.width}x${art.height} ${art.measurementUnit}`} </span>  </div>       
                            </div>
                            <div className="price_n_buy">
                            { auth && (auth.uid !== storeOwnerId)
                                ? <span className="buy"> Buy </span> 
                                : auth && (auth.uid === storeOwnerId)
                                    ? <span className="buy stop"> Stop </span>
                                    : null
                            }
                                <span className="price"> Rs.{art.cost} </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Arts