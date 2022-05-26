import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import portrait from '../../../static/portrait.png'
import { UpdateProfile, updateEmail } from '../../../store/actions/UpdateProfile'
import { CircularLoader } from '../../../loaders/circular'

class EditProfile extends Component {
  constructor() {
    super()
    this.quoteRef = React.createRef()
    this.experienceRef = React.createRef()
    this.counterRef = React.createRef()
    this.state = {
      letterCount: 0,
      isUploading: false
    }
  }
  // close modal
  closeModal = () => {
    this.props.onClick()
    document.getElementById("body").style.overflow = 'auto';
  }

  // trigger input/file
  handleTrigger = () => {
    const ref = this.refs.picture
    ref.click()
  }

  // hanlde file change
  handleChange = (event) => {
    event.persist()
    const input = event.target;
    const imageOriginalName = input.files[0].name
    const reader = new FileReader()
     reader.onload = () => {
       const dataURL = reader.result

       this.setState(() => {
         return {
           imageSrc: dataURL,
           imageName: imageOriginalName
         }
       })
     }
     reader.readAsDataURL(input.files[0])
  }

  countLetter = (e) => {
    const ref = this.quoteRef.current
    const value = ref.innerText
    const targetEl = this.counterRef.current

    targetEl.innerText = `${value.length}/160`
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      ref.blur()
    }

    if(value.length > 160) {
      targetEl.style.color = 'red'
      this.setState({quoteLenghthy: true})
    } else if(value.length <= 160) {
      targetEl.style.color = 'black'
      this.setState({quoteLenghthy: false})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const uname = this.refs.uname.value
    const image = this.refs.picture.files[0]
    const hometown = this.refs.userfrom.value
    const currentCity = this.refs.livein.value
    const phone = this.refs.phone.value
    const email = this.refs.email.value
    const fb = this.refs.fb.value
    const insta = this.refs.insta.value
    const yt = this.refs.yt.value
    const other = this.refs.other.value
    const quote = this.quoteRef.current.innerText
    const author = this.refs.author.value
    const experience = this.experienceRef.current.innerText
    const currentEmail = this.props && this.props.profile && this.props.profile.email

    if(image && (quote.length <= 160)) {
      const storage = firebase.storage()
      const storageRef = storage.ref('ProfilePicture/' + image.name) // creating storage reference

      // inserting image to firestore
      const uploadTask = storageRef.put(image)
      uploadTask.on('state_changed',
      (snapshot) => {
        // catch image upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        console.log('Upload is ' + progress + '% done')
        if(progress !== 0 && progress !== 100) {
          this.setState({isUploading: true})
        }
      },
      (error) => {
        this.setState({error})
        alert(error)
      },
      () => {
        // getting download url for the image
        uploadTask.snapshot.ref.getDownloadURL()
        .then(url => {
          let imageUrl = url
          this.setState(() => {
            return {
              userdata: {
                username: uname,
                hometown,
                currentCity,
                phone,
                email,
                quote: {
                  content: quote,
                  author: author
                },
                experience,
                imageUrl,
                social: {
                  fb,
                  insta,
                  yt,
                  other
                }
              }
            }
          }, _ => {
            this.props.UpdateProfile(this.state.userdata)
            if(email !== undefined && email !== null && email !== '\n' && email !== currentEmail ) {
              this.props.updateEmail(email)
            }
            // window.location.reload()
          })
        })
      })
    } else if(quote.length <= 160) {
      this.setState(() => {
        return {
          userdata: {
            username: uname,
            hometown,
            currentCity,
            phone,
            email,
            quote: {
              content: quote,
              author: author
            },
            experience,
            social: {
              fb,
              insta,
              yt,
              other
            }
          }
        }
      }, _ => {
        console.log("data: ", this.state.userdata)
        this.props.UpdateProfile(this.state.userdata)
        this.props.updateEmail(email)
        //window.location.reload()
      })
    }
  }

  render() {
    const { profile } = this.props // auth is also recieved but not assigned
    console.log("URL",profile)

    console.log("render props: \n", profile)
    return(
      <div className="modal_wrapper">
        <form onSubmit={this.handleSubmit}>
          <div className="modal_cont white">
            <div className="edit-head">
              <i
                className="material-icons close white"
                onClick={this.closeModal}>close</i>
              <span> Edit Your Profile </span>
            </div>
            <div className="edit_pic">
              <div className="picture_wrapper">
                <i
                  className="material-icons"
                  onClick={this.handleTrigger}>
                    create
                </i>
                { !this.state.imageSrc
                    ? profile && (profile.imageUrl || profile.avatarUrl)
                      ? <img
                          src={profile.imageUrl || profile.avatarUrl}
                          alt="dp"
                          height="150px"
                          width="150px" />
                      : <img
                          src={portrait}
                          alt="dp"
                          height="150px"
                          width="150px" />
                      : <img
                        src={this.state.imageSrc}
                        alt="dp"
                        height="150px"
                        width="150px" />
                    }
              </div>
              <div className="edit_username">
                <label htmlFor="uname"> User Name </label>
                <input
                  type="text"
                  ref="uname"
                  id="uname"
                  placeholder="your full name"
                  defaultValue={
                    profile && profile.username
                    ? profile.username
                    : null } />
              </div>
              <div className="hide">
                <input
                  type="file"
                  ref="picture"
                  onChange={this.handleChange}  />
              </div>
            </div>

                    <div className="devider"></div>

            <div className="edit_user_info edit_info">
              <div className="in_cover">
                <div>
                  <label htmlFor="userfrom"> Where are you from? </label>
                  <input
                    type="text"
                    ref="userfrom"
                    id="userfrom"
                    placeholder="hometown"
                    defaultValue={ profile && profile.hometown ? profile.hometown : null } />
                </div>
              </div>
              <div className="in_cover">
                <div>
                  <label htmlFor="livein"> Where do you live? </label>
                  <input
                    type="text"
                    ref="livein"
                    id="livein"
                    placeholder="current city"
                    defaultValue={ profile && profile.currentCity ? profile.currentCity : null } />
                </div>
              </div>
            </div>

            <div className="contact">
              <span> Contact Info </span>
            </div>

            <div className="edit_contact_info edit_info">
              <div className="in_cover">
                <div>
                  <label htmlFor="livein"> Phone Number </label>
                  <input
                    type="tel"
                    ref="phone"
                    id="phone"
                    placeholder="your phone"
                    defaultValue={ profile && profile.phone && profile.phone !== '\n' ? profile.phone : null } />
                </div>
              </div>
              <div className="in_cover">
                <div>
                  <label htmlFor="email"> Enter Email </label>
                  <input
                    type="email"
                    ref="email"
                    id="email"
                    placeholder="your email"
                    defaultValue={ profile && profile.email ? profile.email : null } />
                </div>
              </div>
            </div>

            <div className="edit_social_info edit_info">
              <div className="in_cover">
                <div>
                  <label htmlFor="fb"> Facebook Profile </label>
                  <input
                    type="text"
                    ref="fb"
                    id="fb"
                    defaultValue={ profile && profile.social && profile.social.fb && profile.social.fb !== '\n' ? profile.social.fb : null}
                    placeholder="facebook profile link" />
                    <span className="helper"> Provide profile link </span>
                </div>
              </div>
              <div className="in_cover">
                <div>
                  <label htmlFor="insta"> Instagram Profile </label>
                  <input
                    type="text"
                    ref="insta"
                    id="insta"
                    defaultValue={ profile && profile.social && profile.social.insta && profile.social.insta !== '\n' ? profile.social.insta : null }
                    placeholder = "Instagram username" />
                </div>
              </div>
              <div className="in_cover">
                <div>
                  <label htmlFor="yt"> YouTube Profile </label>
                  <input
                    type="text"
                    ref="yt"
                    id="yt"
                    defaultValue={ profile && profile.social &&  profile.social.yt && profile.social.yt !== '\n' ? profile.social.yt : null }
                    placeholder = "youtube channel" />
                </div>
              </div>
              <div className="in_cover">
                <div>
                  <label htmlFor="other"> Other </label>
                  <input
                    type="text"
                    ref="other"
                    id="other"
                    defaultValue= { profile && profile.social && profile.social.other && profile.social.other !== '\n' ? profile.social.other : null}
                    placeholder = "other web links" />
                </div>
              </div>
            </div>

                    <div className="devider"></div>

            <div className="edit_quote">
              <div className="contact">
                <span> About you </span>
              </div>
              <label className="edit_quote_title">
                What saying inspires you the most?
              </label>
              <div
                className="about_cont"
                contentEditable="true"
                ref={this.quoteRef}
                onKeyPress={this.countLetter}
                onKeyUp={this.countLetter}>
                  {profile && profile.quote && profile.quote.content !== '\n' && profile.quote.content ? profile.quote.content : null }
              </div>
              <span className="helper">
                this can be somebody else's famous saying or
                your own inspirationl thought
              </span>
              { this.state.quoteLenghthy
                      ? <p className="red-text">
                          inspirationl quote must not exceed the length of 160 letters
                        </p>
                      : null }
              <span
                className="letter_count"
                ref={this.counterRef}> </span>
              <label htmlFor="author"> Author </label>
              <input id="author" ref="author" defaultValue={ profile && profile.quote && profile.quote.author !== '\n' ? profile.quote.author : null }
              type="text" placeholder="author" />
            </div>

            <div className="edit_quote edit_experience">
              <label className="edit_quote_title">
                Tell people about your experience in Art
              </label>
              <div
                className="about_cont"
                contentEditable="true"
                ref={this.experienceRef}>
                  {profile && profile.experience && profile.experience !== '\n' ? profile.experience : null }
              </div>
              <span className="helper">
                Writing experience would help exhibit your talent and grow audience.
                Make it short and readable
              </span>
            </div>

            { this.state.isUploading
              ? <div className="loader">
                  <div className="loader_cover">
                    <CircularLoader />
                  </div>
                </div>
              : <button
                  className="btn z-depth-0">
                    Update
                </button>
            }
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateProfile: (data) => dispatch(UpdateProfile(data)),
    updateEmail: (data) => dispatch(updateEmail(data))
  }
}

export default connect(null, mapDispatchToProps)(EditProfile)
