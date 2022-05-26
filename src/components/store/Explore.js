import React from 'react'
import  { Link } from 'react-router-dom'
// import StoreNav from './StoreNav'
import StoreList from './StoreList'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

// import blackink from '../../static/blackink.jpg'
// import coffee from '../../static/coffee.jpg'
// import photo from '../../static/photo.jpg'
// import table from '../../static/table.jpg'
// import sketch from '../../static/sketch.jpg'
// import unreal from '../../static/unreal.jpg'

const Explore = ({ stores }) => {
    // const arts = [blackink, coffee, photo, table, sketch, unreal, table, sketch, unreal]    
    return (
        <div className="explore">
            <div className="nav">
                <ul>
                    <li> 
                        <Link to='/'  className="green-text">
                            logo
                        </Link>
                    </li>
                    {/* <li> My Store </li> */}
                </ul>
            </div>
            <div className="store_list">
                <div>
                    { stores && stores.map((store, index) => {
                        return(
                            <div key={index}> 
                                <Link to='/store/someid'>
                                    <StoreList store={store} />                        
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        stores: state.firestore.ordered.stores
    }
}

export default compose(
    firestoreConnect([
        {
            collection: 'stores'
        }
    ]),
    connect(mapStateToProps)
)(Explore)