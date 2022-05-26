import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { deletePost } from '../../store/actions/ProjectActions'

import AddComment from './projectActs/AddComment'
import PostCredits from './projectActs/PostCredits'
import Comments from './projectActs/Comments'
// import FixedCategories from './Categories'
// import { ShowImage } from './ShowImage'

class ProjectSummary extends Component{
  constructor() {
    super()
    this.linkRef = React.createRef()
    this.state = {
      style: {
        display: 'none'
      }
    }
  }


  removePost = (docId) => {
    this.props.deletePost(docId)
    
  }


  render() {
    // console.log(window.location.href)
    // const currentUrl = window.location.href
    const { project, auth, comments } = this.props ? this.props : null // changes done
    const likeCount = project.likeCount ? project.likeCount : 0
    const collected = project.collected ? project.collected : 0
    // console.log("project: ", project)

    const name = project && project.authorName
    const nameArr = name.split(' ')
    
    let initials = ''
    if(nameArr && (nameArr[1] !== undefined)) {
      initials = `${nameArr[0][0]}${nameArr[1][0]}`
    } else if(nameArr && (nameArr[1] === undefined)) {
      initials = `${nameArr[0][0]}${nameArr[0][1]}`
    }

  return(
    <div className="card z-depth-0 project-summary show-up post">
      {/* <div className="expand_img">
        <ShowImage />
      </div> */}
      <div className="name">
        <Link to={'/profile/' + project.authorId} className="black-text">
          <div className="btn z-depth-0 user-indicator">
            <span>
              {initials}
            </span>
          </div>
          <span className="user_name">
            {project.authorName}
          </span>
        </Link>

          { project.authorId === auth.uid
            ? <span className="right options">
                <button className="btn z-depth-0 transparent"
                  onClick={() => this.removePost(project.id)}>
                  <i className="material-icons">
                    delete
                  </i>
                </button>
              </span>
            : null }

      </div>

      <div className="card-image post_image">
        { project && project.imageUrl
          ? <img src={project.imageUrl} alt="art" />
          : <div className="pre_image_loader"> </div>
        }
        <div className="postcredits_wrap">
          <PostCredits
            project={project}
            likeCount={likeCount}
            collected={collected}
            auth={auth}/>
        </div>
      </div>

      <div className="card-reveal">

        <span className="card-title grey-text text-darken-4">
          comments
          <i className="material-icons">close</i>
        </span>
          <div className="devider"></div>
        {comments && project
          ? <Comments
              projectId={project.id}
              comments={comments}/>
          : null
        }
      </div>

      <div className="card-content">
        <p className="grey-text date-format">
          {project.createdAt && project.createdAt
            .toDate()
            .toLocaleDateString('indian', {
              year: "numeric", month: "short", day: "numeric"
          })}
        </p>
        <p className="content"> {project.content} </p>
          <p className="grey-text lighten-2 load-comments activator">
            Load comments
          </p>
      </div>

      <div className="add-comment">
        <AddComment projectId={project.id} />
      </div>
    </div>
  )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (docId) => dispatch(deletePost(docId)) 
  }
}

const mapStateToProps = (state, ownProps) => {
//  console.log("proSum: ", state)
  const id = ownProps.project.id
  const comments = state.firestore.ordered[id]

  return {
    comments: comments,
    auth: state.firebase.auth
  }
}

export default compose (
  firestoreConnect(props => {
    return [
      {
        collection: 'projects',
        doc: props.project.id,
        subcollections: [
          {
            collection: 'comments'
          }
        ],
        storeAs: props.project.id,
        orderBy: ['commentTime', 'desc']
      }
    ]
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(ProjectSummary)

// export default ProjectSummary
