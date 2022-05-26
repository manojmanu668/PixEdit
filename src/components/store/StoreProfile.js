import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import StoreNav from './StoreNav'
import SellNew from './SellNew'
import Arts from './Arts'

class StoreProfile extends Component {

    constructor() {
        super()
        this.state = {
            style: {
                display: 'none'
            },
            art: {}
        }
        this.formModal = React.createRef()
    }

    closeImage = () => {
        this.setState({style:{display:'none'}})
        document.getElementById("body").style.overflow = 'auto';
    }

    displayImage = (art, title, description) => {
        this.setState(() => {
            return {
                style: {
                    display:'block'
                },
                art: {
                    currentImage: art,
                    title,
                    description
                }
            }
        })
        document.getElementById("body").style.overflow = 'hidden';
    }

    displayFormModal = () => {
        const ref = this.formModal.current
        ref.classList.remove("hide")
    }

    closeModal = () => {
        const ref = this.formModal.current
        ref.classList.add("hide")
    }

    handleInputTrigger = () => {
        const ref = this.refs.image
        ref.click()
      }

    // handleFile = (e) => {
    //     const ref = e.target
    //     const file = ref.files[0]
    //     const reader = new FileReader()
    // }

    render() {
        const { storeObj, sellingArts, auth } = this.props
        const { art } = this.state
        return (
            <div>
                <div className="display_image" style={this.state.style}>
                    <div>
                        <img src={art.currentImage} alt="overview" />
                        <div>
                            { art && (art.title !== undefined ) 
                              ? <h5 className="title"> {"Title: "+art.title} </h5>
                                : null }
                            { art && (art.description !== undefined ) 
                              ? <p> {"description: "+art.description} </p>
                                : null }
                        </div>
                    </div>
                    <i className="material-icons"
                        onClick={this.closeImage}> close </i>
                </div>
                <div className="sell_new_window hide" ref={this.formModal}>
                    <SellNew 
                        onClick={this.closeModal}
                        storeId={storeObj && storeObj.id} />
                </div>
                <div className="store">
                    <StoreNav onClick={this.displayFormModal} />
                    <div className="row store_owner">
                        <div className="col l6 m6 s12 store_details">
                            <i 
                                className="material-icons"
                                onClick={this.handleInputTrigger}> store </i>
                            <input
                                className="add_post_img" 
                                type="file"
                                ref="image"
                                onChange={this.handleFile} />
                            <div>
                                <span className="store_name"> {storeObj && storeObj.storeName} </span>
                                <span className="user_profile">
                                    PixEdit Profile {'  '}
                                    <Link to={`/profile/${storeObj && storeObj.ownerId}`}>
                                        { storeObj && storeObj.ownerName }
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div className="col l12 m12 s12 selling_arts">
                            <Arts 
                                onClick={this.displayImage} 
                                arts={sellingArts} 
                                storeOwnerId={storeObj && storeObj.ownerId}
                                auth={auth} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default StoreProfile