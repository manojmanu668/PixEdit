import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Message from './components/dashboard/Message'
import Notification from './components/dashboard/Notification'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ForgotPassword from './components/auth/ForgotPassword'
import ProjectDetails from './components/projects/ProjectDetails'
import Profile from './components/profile/Profile'
// import EditProfile from './components/profile/functions/EditProfile'
// import Store from './components/store/Store'
// import CreateStore from './components/store/CreateStore'
// import Explore from './components/store/Explore'
import Users from './components/dashboard/MobileUsers'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/message' component={Message} />
            <Route path='/notifications' component={Notification} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/projectdetails/:id' component={ProjectDetails} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/people' component={Users} />
            {/* <Route path='/store/:id' component={Store} />
            <Route path='/explorestores' component={Explore} />
            <Route path='/createtore' component={CreateStore} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
