import React, { Component } from 'react';
import Private from './Private'

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = { listId: '', name: '', description:'' };
    this.service = new Private();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const listId = this.props.list._id;
    const name = this.state.name;
    const description = this.state.icon;

    this.service.profile(listId, name, description)
    .then( response => {
        this.setState({
            listId: "",
            name:"", 
            description: "",
        });
        this.props.getUser(response.user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value, description: value});
  }
      

  render() {
    return(
      <div>
        <h3>Add an item to this list</h3>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>name:</label>
            <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          <fieldset>
            <label>description:</label>
            <input type="text" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}



export default ItemForm;