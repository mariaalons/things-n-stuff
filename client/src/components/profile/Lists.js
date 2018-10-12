import React, { Component } from 'react';
import Private from './Private'
import ItemForm from './ItemForm'

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { list : null, hidden:{}};
    this.service = new Private();
  }

  componentDidMount() {
    this.service.showList()
      .then(res => {
        const list = [...res]
        const hidden = {};
        list.forEach(e => hidden[e._id] = true)
        this.setState({ list , hidden});
      })
  }

  toggleForm(id){
    const _hidden = {...this.state.hidden}

    _hidden[id] = !_hidden[id]
    this.setState({hidden:_hidden})
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
              <button onClick={() => this.toggleForm(list._id)}>Add new Item</button>
              <div hidden={this.state.hidden[list._id]}><ItemForm toggleForm={() => this.toggleForm(list._id)} listid={list._id}/></div>
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