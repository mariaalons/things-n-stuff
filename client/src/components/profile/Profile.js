import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../auth/Auth'
import Lists from '../print/Lists'
import ListForm from './ListForm'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new Auth();
  }


  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
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
  
      return (
      <nav className="nav-style">
        
          <button><Link to='/list'>Create new list</Link></button>
          <Lists/>
          <ListForm userInSession={this.state.loggedInUser}/>      
      </nav>
    )
}
}


export default Profile;