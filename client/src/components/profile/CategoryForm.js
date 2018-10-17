import React, { Component } from 'react';
import Private from './Private'

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { listId: '', name: '', icon:'' };
    this.service = new Private();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const listId = this.props.listid;
    const name = this.state.name;
    const icon = this.state.icon;

    this.service.category(listId, name, icon)
    .then( response => {
        this.setState({
            listId: "",
            name:"", 
            icon: "",
        });
    })
    window.location.reload()
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      

  render() {
    return(
      <div>
        <h3>Add a Category</h3>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>name:</label>
            <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          <fieldset>
            <label>icon:</label>
            <input type="icon" name="icon" value={this.state.icon} onChange={ e => this.handleChange(e)}/>
          </fieldset>
          <input onClick={() =>this.props.toggleForm()} type="submit" value="Create" />
        </form>
      </div>
    )
  }
}



export default CategoryForm;