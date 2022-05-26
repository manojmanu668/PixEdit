import React, { Component } from 'react'
import { createStore } from '../../store/actions/CreateStore'
import { connect } from 'react-redux'

class CreateStore extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {

        this.handleSubmit = (e) => {
            e.preventDefault()
            const ownerName = this.refs.ownername.value
            const storeName = this.refs.storename.value

            this.setState(_ => {
                return {
                    ownerName,
                    storeName
                }
            }, () => {
                this.props.createStore(this.state)
            })
        }
    
        return (
            <div className="create_store_cover">
                <div className="wrapper">
                    <div class="row">
                        <form 
                            class="col l8 offset-l2 offset-m2 m8 s12"
                            onSubmit={this.handleSubmit}>
                            <div className="row">
                                <h5> Create New Store </h5>
                                <div class="input-field col l12 m12 s12">
                                    <input ref="ownername" id="ownername" type="text" class="validate" />
                                    <label htmlFor="ownername">Owner Name</label>
                                </div>
                                <div className="input-field col l12 m12 s12">
                                    <input ref="storename" id="storename" type="text" class="validate" />
                                    <label htmlFor="storename">Give your store a name</label>
                                </div>
                                <button> Create Store </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStore: (store) => dispatch(createStore(store))
    }
}

export default connect(null, mapDispatchToProps)(CreateStore)