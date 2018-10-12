import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Auth from '../auth/Auth'
import Lists from './Lists'
import ListForm from './ListForm'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null ,
    hidden:true};
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
  toggleForm(){
    const hidden = !this.state.hidden
    this.setState({hidden:hidden})
  }
  render() {
    this.fetchUser()
  
      return (
  
          <div>
          <button onClick={() => this.toggleForm()}>Create new list</button>
         <div hidden={this.state.hidden}><ListForm toggleForm={() => this.toggleForm()} userInSession={this.state.loggedInUser} getUser={this.getTheUser}/></div>
          <Lists/>  
          </div> 
   
    )
}
}


export default Profile;