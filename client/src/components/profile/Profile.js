import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lists from '../print/Lists'
import ListForm from './ListForm'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }
  render() {
    return (
      <nav className="nav-style">
        
          <button><Link to='/list'>Create new list</Link></button>
          <Lists/>
          <ListForm/>

       
      </nav>
    )
}
}

export default Profile;