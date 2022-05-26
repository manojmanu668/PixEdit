import React , { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
// import unreal from '../../static/unreal.jpg'
const albums = []

class AddToAlbum extends Component {
  constructor() {
    super()
    this.newAlbum = React.createRef()
    this.state={
      className: 'unselect'
    }
  }

  componentWillMount() {
    this.getAlbum()
  }

  getAlbum = () => {
    const db = firebase.firestore()
    const { id } = this.props
    console.log("id: ", this.props)

    return db.collection('albums')
      .where('authorId', '==', id)
      .get().then(documentSnapShots => {
        documentSnapShots.forEach(doc => {
          let obj = {
            ...doc.data(),
            id: doc.id
          }
          albums.push(obj)
          this.setState(() => {
            return {
              albums
            }
          }, () => {
            console.log("albums: ", this.state)
          })
        })
      })
  }

  switchClass = (name, id) => {
    if(this.state.className === 'unselect') {
      this.setState({
        className: 'select',
        select: true,
        album: {
          albumName: name,
          id
        }
      }, () => {
        this.props.onClick(this.state.album)
        console.log("from: ", this.state)
      })
    } else {
      this.setState({
        className: 'unselect',
        select: false
      })
    }
  }

  handleClick = () => {
    const ref = this.newAlbum.current
    const data = ref.innerText
    const albumName = data.replace(/\n/g, '')
    console.log(albumName)

    this.setState(() => {
      return {
        albumName
      }
    }, () => {
      this.props.onClick(this.state.albumName)
    })
  }

  render() {
    console.log("props: ", this.props)
    return(
      <div className="addtoalbum">
        <div>
          { this.state && this.state.albums
            ? <div className="album_list">
              { this.state && this.state.albums.map(album => {
                return(
                  <div>
                     <img src={album.photos[0]} alt="img"/>
                     <span> {album.albumName} </span>
                     <span
                       className={`${this.state.className}`}
                       onClick={() => this.switchClass(album.albumName, album.id)}>
                       <i className="material-icons">check</i>
                     </span>
                   </div>
                )
              })}
            </div>
            : <div className="center">
                <span className="red-text">
                  <i> you have no albums! </i>
                </span>
              </div>
          }
          <form className="form">
            <span
              className="new_alb editable"
              ref={this.newAlbum}
              contentEditable="true"
              data-placeholder="new album..."
              onKeyUp={this.handleClick}>
              </span>
              <span
                className="btn z-depth-0 green button">
                <i className="material-icons">check</i>
              </span>
          </form>
        </div>
      </div>
    )
  }
}

export default AddToAlbum
