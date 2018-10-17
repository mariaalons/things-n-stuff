import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Auth from './components/auth/Auth';
import Private from './components/profile/Private';
import Profile from './components/profile/Profile';

class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new Auth();
    this.private = new Private();
  }


  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
    })
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  render() {
    this.fetchUser()

    if(this.state.loggedInUser){
      return (
        <div className="App">
          <header className="App-header">
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            
          </header>
          <div>
          <Switch>
            <Route exact path='/profile' render={() => <Profile getUser={this.getTheUser} userInSession={this.state.loggedInUser}/>}/>
            </Switch> 
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Navbar  logout={this.logout} />
            <Switch>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
            </Switch>
          </header>
        </div>
      );
    }
  }
}

export default App;