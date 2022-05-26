import React from 'react'

const StoreIntro = () => {
    return (
        <div className="store_cover">
            <div className="store_wrapper">
                <div className="title">
                    <h3> ColorStore? </h3>
                </div>

                <div className="reverse">
                    <i className="material-icons"> photo_album </i>
                    <p className="about_store">
                        creating a ColorStore helps <span className="highlight">promot/sell</span> your <span className="highlight">art gallery/arts </span>
                            to maximize the number of potential costomers
                    </p>
                </div>

                <div>
                    <i className="material-icons"> store </i>
                    <p className="about_store">
                        Generally <span className="highlight">ColorStore</span> is an online store
                        which is either a physical store for Art, mainly paintings, managed by a group for business purpose
                        or just an online store handled by an indivisual.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StoreIntro