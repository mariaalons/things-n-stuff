
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../auth/Auth';
import Private from '../profile/Private';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new Auth();
    this.service = new Private();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style">
          <ul>
            <li><a onClick={this.handleLogout}>Logout</a></li>
            <li><Link to='/profile'>profile</Link></li>
          </ul>

          <h2>Hi there {this.state.loggedInUser.username}</h2>
          <img src={this.state.loggedInUser.image} alt={this.state.loggedInUser.username}/>
        </nav>
      )
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

export default Navbar;