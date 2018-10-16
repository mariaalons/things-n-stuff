
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
          <div>
            <a onClick={this.handleLogout}>Logout</a>
            <Link to='/profile'>profile</Link>
          </div>

          <h2>Hi there {this.state.loggedInUser.username}</h2>
          <img style={{height:100, width:100}} src={this.state.loggedInUser.image} alt={this.state.loggedInUser.username}/>
        </nav>
      )
    } else {
      return (
        <div>
          <nav className="nav-style">
            <div>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
            </div>
          </nav>
        </div>
      )
    }
  }
}

export default Navbar;