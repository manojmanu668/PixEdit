import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import image from '../../static/wall.jpg'

export class CreatePostMobile extends Component {

    render() {

        return (
            <div className="mobile_post_cover">
                <div className="mobile_post">
                    <div className="go_home">
                       <div>
                        <span>
                            <Link to='/'>
                                <i className="material-icons"> close </i> 
                            </Link>
                        </span>
                            New Post
                            <span className="share_btn"> share </span>
                       </div>
                    </div>
                    <div 
                        className="img_preview">
                            <img src={image} alt="upload" className="responsive-img" />
                    </div>
                    <div className="title write">
                        <span> Give it a title </span>
                        <div
                            className="edt_wrap editable"
                            contentEditable="true"
                            data-placeholder="e.g. My fantastic Home"
                            role="textbox"
                            ref={this.story}
                            onKeyPress={this.handleKeyPress}>
                        </div>
                    </div>
                    <div className="thought write">
                        <span> Write more about your art </span>
                        <div
                            className="edt_wrap editable"
                            contentEditable="true"
                            data-placeholder="give it your thought or a touching story to reach more people!"
                            role="textbox"
                            ref={this.story}
                            onKeyPress={this.handleKeyPress}>
                        </div>
                    </div>

                    <div className="tag write">
                        <span> Add it to a category </span>
                        <div
                            className="edt_wrap editable"
                            contentEditable="true"
                            data-placeholder="e.g. pencil sketch, oil paintig, hyper rialistic..."
                            role="textbox"
                            ref={this.category}>
                        </div>
                    </div>
                    <div className="submit_post">
                        <button>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}
