import React, { Component } from 'react';
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
    return(
      <div>
        <h3>Welcome! create your account</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          <fieldset>
            <label>Email:</label>
            <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          <fieldset>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </fieldset>
          <fieldset>
          <input type="file" name="photo" value={this.state.image} onChange={ e => this.handleChangeFile(e)}/>
          </fieldset>
          <input type="submit" value="Sign up" />
        </form>
      </div>
    )
  }
}

export default Signup;