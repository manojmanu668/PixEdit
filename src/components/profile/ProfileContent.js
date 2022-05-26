import React, { Component } from 'react'
import Picture from './Components/Picture'
import Quote from './Components/Quote'
import Tabs from './Tabs'
import UserDetails from './Components/UserDetails'
import Collection from './Components/Collection'
import Artwork from './Components/Artwork'
import Bio from './Components/Bio'
import Setup from './Components/Setup'
import Update from './Components/Update'
import Pay from './Components/Pay'


class ProfileContent extends Component {
  constructor() {
    super()
    this.state = {
      psetup: false
    }
  }

  handleClick = (tab) => {
    this.setState(() => {
      return {
        selectedTab: tab
      }
    }, () => {
      console.log('bekiro ',this.state)
    })
  }

  displayModal = () => {
    this.props.onClick()
  }

  hanbleClick = () => {
    //this.setState(this.state);
    this.setState(() => {
      return {
        
        psetup: true
        //this.setState(this.state);
      }}
    , () => {
      //console.log('bekiro ',this.state)
    })
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.psetup !== this.state.psetup){
  //     return <Update auth={prevProps.auth} paramId={prevProps.paramId} />
  //   }
  // }


  render() {
    const { profile, auth, artWorks, paramId } = this.props
    console.log("auth aujsbcnauc", auth)
    let currentTab = this.state.selectedTab
    let tab

    if(currentTab === 'Collection') {
      tab = <Collection id={auth} paramId={paramId} />
    } else if(currentTab === 'Bio') {
      tab = <Bio profile={profile} />
    }  else if(currentTab === 'Setup') {
      tab = <Setup auth={auth} paramId={paramId} onClick={this.hanbleClick}/>
    }  else if(currentTab === 'Update') {
      tab = <Update auth={auth} paramId={paramId} />
    }  else if(currentTab === 'Pay') {
      tab = <Pay paramId={paramId} />
    }  else {
      tab = <Artwork artWorks={artWorks} auth={auth}  paramId={paramId} profile={profile}/>
    }

    return(
      <div className="">
        <div className="stick">

          <div className="col l6 m6 s12">
            <div className="card z-depth-0 white height210">
              <div className="profile_basic_cover">
                { profile
                  ? <Picture
                      profile={profile}
                      auth={auth}
                      paramId={paramId}
                      onClick={this.displayModal}/>
                  : null }
              </div>
                    <div className="devider"></div>
              <div className="tab_sec">
              { auth && auth.uid
                  ? <Tabs onClick={this.handleClick} auth={auth} paramId={paramId} psetup={this.state.psetup}/>
                  : null }
                
              </div>
            </div>
            <div>
              { profile
                ? <UserDetails profile={profile} />
                : null
              }
            </div>
            <div className="hide-on-med-and-up quote_use_det">
            { profile && profile.quote && profile.quote.content && profile.quote.content !== '\n'
              ? <Quote quote={profile.quote} />
              : null
            }
              {tab}
            </div>
          </div>

        </div>

        <div className="col l6 m6 hide-on-small-only quote_use_det">
          { profile && profile.quote && profile.quote.content && profile.quote.content !== '\n'
            ? <Quote quote={profile.quote} />
            : null
          }
          {tab}
        </div>
      </div>
    )
  }
}
export default ProfileContent
