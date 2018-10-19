import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import Auth from './Auth'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new Auth();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;
    const photo = this.state.photo;

    this.service.signup(username, password, email, photo)
    .then( response => {
        this.setState({
            username: "",
            email:"", 
            password: "",
            redirect:true,
            photo: null
        });
        this.props.getUser(response.user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    
    const {name, value} = event.target;
    
    this.setState({[name]: value});
  }

  handleChangeFile = (event) => {  
    const value= event.target.files[0]
    this.setState({'photo': value});
  }
      

  render() {
    if (this.state.redirect) return <Redirect to='/'/>
    return(
      <div className='auth-form'>
       <div className='auth-content'>
        <h3>Welcome to Things 'n' Stuff! <br></br> create your account</h3>

        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <label>Username:</label>
            <div className="control">
            <input className="input is-primary" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
            </div>
            </div>
          <div className="field">
            <label>Email:</label>
            <input className="input is-primary" type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          </div>
          <div className="field">
            <label>Password:</label>
            <input className="input is-primary" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </div>
          <div className="field">
          <input type="file" name="photo" value={this.state.image} onChange={ e => this.handleChangeFile(e)}/>
          </div>
          <input className="button is-new" type="submit" value="Sign up" />
        </form>
      </div>
      </div>
    )
  }
}

export default Signup;