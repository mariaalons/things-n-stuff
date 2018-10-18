import React, { Component } from 'react';
import Private from './Private'

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = { categoryId: '', name: '', description:'' };
    this.service = new Private();
  }

  handleFormSubmit = (event) => {
  event.preventDefault();
  const categoryId = this.props.categoryid;
  const name = this.state.name;
  const description = this.state.description;
  const photo = this.state.photo;

  this.service.item(categoryId, name, description, photo)
    .then(response => {
      this.setState({
        categoryId: "",
        name: "",
        description: "",
        photo: null
      });
      window.location.reload()
    })
    .catch(error => console.log(error))
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleChangeFile = (event) => {  
    const value= event.target.files[0]
    this.setState({'photo': value});
  }

  toggleForm(id){
    const _hidden = { ...this.state.hidden }

    _hidden[id] = !_hidden[id]
    this.setState({ hidden: _hidden })
  }
      

  render() {
    return(
      <div>
        <h3>Add an item to this list</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <label>name:</label>
            <input className="input is-primary" type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          </div>
          <div className="field">
            <label>description:</label>
            <input className="input is-primary" type="text" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>
          </div>
          <div className="field">
          <input className="input is-primary" type="file" name="photo" value={this.state.image} onChange={ e => this.handleChangeFile(e)}/>
          </div>
      
          <input className="button is-primary" onClick={() =>this.props.toggleForm()} type="submit" value="Create" />
        </form>
      </div>
    )
  }
}



export default ItemForm;