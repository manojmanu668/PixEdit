import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Category extends Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { storeId } = this.props
    return(
      <div className="section">
        <div className="category_cover">
          <ul>
            <div className="category">
              <li>
                <i className="material-icons">
                  collections
                </i>
                <span>
                  Album
                </span>
              </li>
              { storeId
                ? <Link to={'/store/' + storeId}>
                    <li>
                      <i className="material-icons">
                        store
                      </i>
                      <span>
                        Store
                      </span>
                    </li>
                  </Link>
                  : <Link to={'/createtore'}>
                      <li>
                        <i className="material-icons">
                          store
                        </i>
                        <span>
                          Store
                        </span>
                      </li>
                    </Link>

              }
            </div>
          </ul>
        </div>
      </div>
    )
  }
}

export default Category
