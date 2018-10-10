import React, { Component } from 'react';
import Private from './Private'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: '', name: '', icon:'' };
    this.service = new Private();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const userId = this.props.userInSession._id;
    const name = this.state.name;
    const icon = this.state.icon;

    this.service.profile(userId, name, icon)
    .then( response => {
        this.setState({
            userId: "",
            name:"", 
            icon: "",
        });
        this.props.getUser(response.user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      

  render() {
    return(
      <div>
        <h3>Time to create lists</h3>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>name:</label>
            <input type="text" name="name" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          <fieldset>
            <label>icon:</label>
            <input type="icon" name="icon" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          <input type="submit" value="Create" />
        </form>

      </div>
    )
  }
}



export default List;