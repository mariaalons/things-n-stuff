
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
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
        <nav className="navbar navbar-2">
          <div className='navbar-start'>
          <img className="logo" style={{height:45, margin:10}} alt='logo' src='https://res.cloudinary.com/dr1df4kwt/image/upload/v1539847265/folder-name/push-pin.png'/>
          <Link className="navbar-item letter" to='/'>Home</Link>
         
          <Link className="navbar-item letter" to='/profile'>Profile</Link>
          <div/>
          <div>
            <div className="navbar-item">
           
            
            <InputBase
              placeholder="Search…"
            />
            <IconButton>
            <SearchIcon />
            </IconButton>
          </div>
          </div>
          </div>
          <div className="navbar-end">
          <div className="buttons navbar-item">
          <button className="button is-dark" onClick={this.handleLogout}>Logout</button>
          </div>
          <div className='avatar'>
          <img alt={this.state.loggedInUser.username}  src={this.state.loggedInUser.image}/>
          </div>
          </div>
          </nav>
      )
    } else {
      return (
        <div>
          <nav className="navbar navbar-1">

          <div className='navbar-start'>
          <img className="logo" style={{height:45, margin:10}} alt='logo' src='https://res.cloudinary.com/dr1df4kwt/image/upload/v1539847265/folder-name/push-pin2.png'/>
          <Link className="navbar-item letter2" to='/'>Home</Link>
            
          </div>
            <div className="navbar-end">
            <div className="buttons navbar-item">
            <Link className="button is-new" to='/signup'>Signup</Link>
          
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