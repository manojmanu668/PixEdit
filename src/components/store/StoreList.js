import React from 'react'
import { Link } from 'react-router-dom'
import wall from '../../static/wall.jpg'

const StoreList = ({ store }) => {

    return (
        <div className="store_item">
            <div
                className="img" 
                style={{ backgroundImage: `url(${(wall)})` }}>
            </div>
            <div className="store_det">
                <h5> {store.storeName} </h5>
                <Link to="/profile/someid">
                    <p className="owner_name"> {store.ownerName} </p>
                </Link>
                {/* <div>
                    <span> 10 frames </span>
                    <span>  </span>
                </div> */}
            </div>
        </div>
    )
}

export default StoreList