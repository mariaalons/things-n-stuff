import React, { Component } from 'react';
import Private from './Private'
import ItemForm from './ItemForm'

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { list : null, hidden:true};
    this.service = new Private();
  }

  componentDidMount() {
    this.service.showList()
      .then(res => {
        this.setState({ list : [...res]});
      })
  }

  toggleForm(){
    const hidden = !this.state.hidden
    this.setState({hidden:hidden})
  }

  render() {
    return (
      this.state.list ?
      <div>
        {this.state.list.map(list => {
          return (
            <div key={list.name}>
            <div>
              <h3>{list.name}</h3>
              <span>{list.icon}</span>
              </div>
              <button>Add new category</button>
              <button listid={list._id} onClick={() => this.toggleForm()}>Add new Item</button>
              <div hidden={this.state.hidden}><ItemForm toggleForm={() => this.toggleForm()} userInSession={this.state.loggedInUser} getUser={this.getTheUser}/></div>
            </div>
          )
        })
        }
      </div>
      : <p>Loading..</p>
    )
  }
}


export default Lists;