import React, { Component } from 'react'
import Album from './Components/Setup'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { NavLink } from 'react-router-dom'
import { TabsValue } from '../../store/actions/TabsAction'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

class Tabs extends Component {

  constructor() {


    super()


    this.state = {
      tabs:[],
      isSetup: true,
      
     }
    // const auth = this.props && this.props.auth && this.props.auth.uid
    // const paramId = this.props && this.props.paramId && this.props.auth.paramId
    // const psetup = this.props && this.props.psetup

  }

  // if(isSetup){
  //   return this.props.TabsValue
  // }

  componentDidMount() {

    this.getSetup()
    
  }

  componentDidUpdate(prevProps, prevState){
    //const num = 2
    if(prevProps.psetup !== this.props.psetup ){
      this.getSetup()
      console.log("tabs again in update")
    }
  }

  // componentDidUpdate(prevProps, prevState){
  //   this.getSetup()
  //   console.log("tabs in update")
  
  // }

   getSetup = () => {


    const auth = this.props && this.props.auth && this.props.auth.uid
    const paramId = this.props && this.props.paramId
    //const { id } = useParams();
    //const Tabs = useSelector(state => state.Tabs)
    // console.log('Tabs auth',auth)
    // console.log("Tabs paramId",paramId)
    this.props.TabsValue(paramId)
    // then(()=>{
      if(this.props.tabvalue){
        this.setState(() => {
          return {tabs: this.props.tabvalue}
        })
      }
      console.log("tabs value in getFunc",this.props.tabvalue)
   }


  hancleClick = (tab) => {
    this.props.onClick(tab)
  }

  render() {
    const {tabs} = this.state ? this.state : null
    //const isSetup = this.state.isSetup ? this.state.isSetup: null
    const psetup = this.props && this.props.psetup
    //const main = this.state.main ? this.state.main: null
    this.state.tabs = this.props.tabvalue
    const { auth, paramId } = this.props
     console.log("The tabs val render",this.state.tabs)
    // console.log("Set issetup",this.state.isSetup.length)
    // console.log("again in tab ",psetup)


        return ( 
          <div className="tab_cover">
          <ul>
            {this.state.tabs.map((tab, index) => {
              return (
                <div
                  key={index}
                  className="tabname"
                  onClick={() => this.hancleClick(tab)}>
                  <li>
                    {tab}
                  </li>
                </div>
              )
            })}
          </ul>
        </div>
     )
  }
}

const mapStateToProps = (state) => {
  return {
    tabvalue: state.TabValue.Tabs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    TabsValue: (paramId) => {dispatch(TabsValue(paramId))}
  }
}

export default

  connect(mapStateToProps,mapDispatchToProps)
(Tabs)

