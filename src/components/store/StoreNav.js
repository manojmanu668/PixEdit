import React from 'react'
import { Link } from 'react-router-dom'

const StoreNav = ({onClick}) => {

    const displayForm = () => {
        onClick()
    }

    return (
        <div>
            <div className="nav_cover">
                <div className="nav">
                    <ul>
                        <li className="store_logo">
                            <Link to='/'>
                                logo
                            </Link>      
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="/explorestores">
                                <i className="material-icons"> explore </i>
                            </Link>
                        </li>
                        <li 
                            className="blue-text"
                            onClick={() => displayForm()}>
                            New frame
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StoreNav