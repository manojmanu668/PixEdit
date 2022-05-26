import React, { Component } from 'react'
import firebase from 'firebase/app'
import { SellArt } from '../../store/actions/ArtActions'
import { connect } from 'react-redux'

class SellNew extends Component {
    constructor() {
        super()
        this.state = {
            style: {
                display: 'none'
            }
        }
    }

    handleInputTrigger = () => {
        const ref = this.refs.image
        ref.click()
      }

    handleFile = (e) => {
        const ref = e.target
        const file = ref.files[0]
        const reader = new FileReader()

        reader.onload = () => {
            let url = reader.result
            this.setState(() => {
                return {
                    preview: url
                }
            }, () => {
                this.setState({style:{display:"block"}})
            })
        }
        reader.readAsDataURL(file)
    }

    closeForm = () => {
        this.props.onClick()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const storeId = this.props.storeId
        const title = this.refs.title.value
        const cost = this.refs.cost.value
        const image = this.refs.image.files[0]
        const height = this.refs.height.value
        const width = this.refs.width.value
        const description = this.refs.text.value
        const select = this.refs.select
        const selectVal = select.options[select.selectedIndex].text

        const storage = firebase.storage()
        const storageRef = storage.ref('sellingArts/' + image.name)
        const uploadTask = storageRef.put(image)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

            console.log('Upload is ' + progress + '% done')
            this.setState({progress})
        },
            (error) => {
                console.log(error)   
            },
            () => {
                // getting download url for the image
                uploadTask.snapshot.ref.getDownloadURL()
                .then(url => {
                    let image = url

                    this.setState(() => {
                        return {
                            send: {
                                values: {
                                    title,
                                    cost,
                                    image,
                                    height,
                                    width,
                                    description,
                                    measurementUnit: selectVal
                                },
                                storeId
                            }
                        }
                    }, () => {
                        console.log("see :", this.state)
                        this.props.SellArt(this.state.send)
                    })
                })
            }
        )
    }

    render() {
        return (
            <div className="sell_new_cover">
                <i className="material-icons"
                    onClick={() => this.closeForm()}> close </i>
                <div className="sell_new_wrapper">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="add_post_img" 
                            type="file"
                            ref="image" 
                            onChange={this.handleFile} />
                        <span
                            className="button"
                            onClick={this.handleInputTrigger}> choose an image </span>
                        <div 
                            style={this.state.style}
                            className="image_preview">
                            <img 
                                src={this.state.preview} 
                                alt="art" />
                        </div>

                       <div className="info">
                            <label> Give this a title </label>
                            <input ref="title" id="title" type="text" placeholder="title, here" />
                        
                            <label> call a basic price </label> 
                            <input ref="cost" type="text" placeholder="cost, here" />

                            <label> size of the art </label>
                            <div className="measure">
                                <input ref="height" type="number" placeholder="height" />
                                <input ref="width" type="number" placeholder="width" />
                                <select ref="select" name="units">
                                    <option value="inch"> in </option>
                                    <option value="feet"> ft </option>
                                    <option value="centimeter"> cm </option>
                                </select>
                            </div>
                       </div>

                        <label> Description </label>
                        <textarea ref="text"></textarea>

                        <button type="submit"> Publish </button>

                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SellArt: (values) => dispatch(SellArt(values))
    }
}

export default connect(null, mapDispatchToProps)(SellNew)