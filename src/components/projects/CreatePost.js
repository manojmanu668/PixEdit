import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import { createProject, createAlbum } from '../../store/actions/ProjectActions'
import AddToAlbum from './AddToAlbum'
import Preview from './Preview'
import { CircularLoader } from '../../loaders/circular'

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

class CreatePost extends Component {
  constructor() {
    super()
    this.contents = React.createRef()
    this.toggleDisplay = React.createRef()
    this.dropUp = React.createRef()
    this.dropDown = React.createRef()
    this.formRef = React.createRef()
    // this.fileResetMessage = React.createRef()
      this.state = {
        title: '',
        content: '',
        imageUrl:'',
        progress: 0,
        album: {},
        displayAlbum: false
      }
  }


  displayAlbum = () => {
    const targetEl = this.toggleDisplay.current
    const downArrow = this.dropDown.current
    const upArrow = this.dropUp.current

    this.setState({displayAlbum: true})

    console.log(targetEl)
    targetEl.classList.toggle('hide')
    downArrow.classList.toggle('hide')
    upArrow.classList.toggle('hide')
  }

  // uploading image to database and "projects"
  handleSubmit = (e) => {
    e.preventDefault()
    const contentRef = this.contents.current
    const data = contentRef.innerText
    const content = data.replace(/\n/g, '')

    const isAlbum = (this.state.album && this.state.album.albumName) || this.state.album.albumId ? true : false
    const albumId = this.state.album && this.state.album.albumId ? this.state.album.albumId : null
    const albumName = this.state.album.albumName ? this.state.album.albumName : null
    const message = "Please choose an image an image to upload!"
    const image = this.refs.image.files[0] ? this.refs.image.files[0] : alert(message)
    const authorImage = this.props && (this.props.profile.imageUrl || this.props.profile.avatarUrl)
    console.log(authorImage)
    if(this.refs.image.files[0]) {
       if(!isAlbum && this.refs.image.files.length === 1) {
        const storage = firebase.storage()
        const storageRef = storage.ref('wallposts/' + image.name) // creating storage reference

        // inserting image to firestore
        const uploadTask = storageRef.put(image)
        uploadTask.on('state_changed',
        (snapshot) => {
          // catch image upload progress
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
            var imageUrl = url
            this.setState(() => {
              return {
                toUpload: {
                  content,
                  imageUrl,
                  authorImage
                }
              }
            }, () => {
              console.log("state::: ", this.state)
              this.props.createProject(this.state.toUpload)
              // this.props.history.push('/')
            })
          })
        })
      } else {
        const storage = firebase.storage()
        const storageRef = storage.ref('albums/' + image.name) // creating storage reference

        // inserting image to firestore
        const uploadTask = storageRef.put(image)
        uploadTask.on('state_changed',
        (snapshot) => {
          // catch image upload progress
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
            var imageUrl = url
            this.setState(() => {
              return {
                album: {
                  content,
                  imageUrl,
                  albumName,
                  albumId,
                  authorImage
                }
              }
            }, () => {
              this.props.createAlbum(this.state.album)
              // this.props.history.push('/')
            })
          })
        })
      }
    }
  }

  // getting image url to preview
  handleFile = (event) => {
    event.persist()
    const input = event.target
    const files = input.files
    const fileType = files[0].type.toLowerCase()
    // console.log("fileType", fileType);
    
    let isValid = true
    if(!acceptedFileTypesArray.includes(fileType)) {
      alert("invalid file! you can upload images only")
      isValid = false
    } 
    this.setState(() => {
      return {
        imageCount: files.length
      }
    })
    console.log(files.length)
    let reader = new FileReader()
    // const imageOriginalName = input.files[0]
    let imageArray = []
    let dataURL = {}

    if((files.length > 1) && (isValid) ) {
      Array.prototype.forEach.call(files, (file) => {
        // let file = input.files[i]
        let reader = new FileReader()
        reader.onload = (e) => {
          dataURL = {url: reader.result}
          imageArray = [dataURL]
        }
        // console.log(i)
        reader.readAsDataURL(file)
        console.log("final Array", imageArray)
      })
      this.setState(() => {
        return {
          preview: imageArray,
          isMultipleImage: true
        }
      }, () => {
        console.log("preview state: ", this.state.preview)
      })
    } else if(isValid) {
      reader.onload = (e) => {
        const dataURL = {url: reader.result}
        console.log("img: ", e.target.result)

        this.setState(() => {
          return {
            preview: [dataURL]
          }
        }, () => {
          console.log("state: ", this.state)
        })
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  // clear selected images (only for multiple images)
  reset = () => {
    const target = this.formRef.current
    const input = this.refs.image
    // console.log("target, before", input.files.length)
    target.reset()
    this.setState({imageCount: input.files.length})
    // const resetMsg = this.fileResetMessage.current
    this.setState({ResetMessage: "files cleared"})
    // console.log("target, after", input.files.length)
  }

  handleInputTrigger = () => {
    const ref = this.refs.image
    ref.click()
  }

  addToCategory = () => {
    
  }

  handleClick = (album) => {
    this.setState({
      album: {albumName: album.albumName, albumId: album.id}
    }, () => {
      console.log("album reutrn: ", this.state)
    })
  }

  render() {
    // getting uid from props
    const { auth } = this.props
    const { preview } = this.state
    if(!auth.uid) return <Redirect to='/signin' /> // redirecting signedOut user to signin page
    return(
      <div className="section create_post_section">
        <div className="card z-depth-0 show-up post_create_wrapper fix_cont">
          <div className="cp_ttl">
            <span> share your work </span>
          </div>
          <div className="preview_cover">

            {preview
              ? <Preview preview={preview} />
              : null}
          </div>

          <form
            className="post_create"
            ref={this.formRef}>
            <div className="thought">
              <div
                className="edt_wrap editable"
                contentEditable="true"
                data-placeholder="Post your artworks..."
                role="textbox"
                ref={this.contents}
                onKeyPress={this.handleKeyPress}>
              </div>
            </div>
            <div className="posting_optn">
              <div onClick={this.handleInputTrigger}>
                <span>
                  <i className="material-icons">
                      add_photo_alternate
                  </i>
                </span>
                <span> add photo </span>
              </div>
              {/* <div>
                <i
                  className="material-icons"
                  onClick={this.addToCategory}>
                    local_offer
                </i>
              </div> */}
                {/* <div title="add to album" onClick={this.displayAlbum}>
                  <i className="material-icons">
                      photo_library
                      <i
                        className="material-icons arrow_down"
                        ref={this.dropDown}>
                        arrow_drop_down
                      </i>
                      <i
                        className="material-icons arrow_down hide"
                        ref={this.dropUp}>
                        arrow_drop_up
                      </i>
                  </i>
                </div> */}
              <input
                type="file"
                accept="image/*"
                ref="image"
                className="add_post_img"
                onChange={this.handleFile} />
            </div>

              { this.state && this.state.imageCount === 0
                ? <div className="reset_message">
                    {this.state.ResetMessage}
                  </div>
                : null }
            { this.state && this.state.imageCount > 1
              ? <div className="file_count">
                  <span> {this.state.imageCount} images selected </span>
                  <span>
                    <i
                      className="material-icons"
                      onClick={this.reset}> refresh </i>
                  </span>
                </div>
              : null }
            <div
              className="addtoalbum_wrap hide"
              ref={this.toggleDisplay}>
              { this.state && this.state.displayAlbum
                ? <AddToAlbum
                  onClick={this.handleClick}
                  id={auth.uid}/>
                : null }
            </div>
            {/*<div>
              <input type="text"/>
              <button className="btn z-depth-0 green">
                <i className="material-icons">check</i>
              </button>
            </div>*/}
            { this.state.progress > 0
              ? <div className="loader">
                  <div className="loader_cover">
                      <CircularLoader />
                      <span className="progress_count"> {Math.round(this.state.progress)}% </span>
                  </div>
                </div> 
              : <div className="input-field submit_post">
                  <button
                    onClick={this.handleSubmit}
                    className="btn z-depth-0">
                    Upload
                  </button>
                </div> }

{/* <div className="input-field submit_post">
                  <button
                    className="btn z-depth-0">
                      <CircularLoader />
                      <span className="progress_count"> 10% </span>
                  </button>
                </div> */}
          </form>
        </div>
      </div>
    )
  }
}

// retrieving aut uid from firebase to store passing it as props
const mapStateToProps = (state) => {
  console.log("user image", state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    createAlbum: (album) => dispatch(createAlbum(album))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
