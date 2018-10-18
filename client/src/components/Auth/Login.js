import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import Auth from './Auth'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new Auth();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          redirect:true,
          error: false
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
  if (this.state.redirect) return <Redirect to='/'/>
    return (<div>
      <h3>Login</h3>

      <form onSubmit={this.handleFormSubmit}>
        <div className="field">
          <label>Username:</label>
          <input className="input is-primary" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
        </div>

        <div className="field">
          <label>Password:</label>
          <input className="input is-primary" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
        </div>

        <input  className="button is-primary" type="submit" value="Login" />
      </form>

      <h1>{this.state.error ? 'Error' : ''}</h1>
    </div>)
  }
}

export default Login;