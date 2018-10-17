
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../auth/Auth';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new Auth();
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
        <nav className="navbar is-primary">
          <div className='navbar-start'>
          <Link className="navbar-item" to='/'>Home</Link>
          <Link className="navbar-item" to='/profile'>Profile</Link>
            
          </div>
          <div className="navbar-end">
          <div className="buttons navbar-item">
          <a className="button is-light" onClick={this.handleLogout}>Logout</a>
          <figure>
          <img className="is-rounded" src={this.state.loggedInUser.image} alt={this.state.loggedInUser.username}/>
          </figure>
          </div>
          </div>
          </nav>
      )
    } else {
      return (
        <div>
          <nav className="navbar is-light">
          <div className='navbar-start'>
          <Link className="navbar-item"  to='/'>Home</Link>
            
          </div>
            <div className="navbar-end">
            <div className="buttons navbar-item">
            <Link className="button is-primary" to='/signup'>Signup</Link>
          
            <Link className="button is-dark" to='/login'>Login</Link>
            </div>
            </div>
          </nav>
        </div>
      )
    }
  }
}

export default Navbar;