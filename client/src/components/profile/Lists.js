import React, { Component } from 'react';
import Private from './Private'

import CategoryForm from './CategoryForm'
import Category from './Category'


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
    const _hidden = { ...this.state.hidden }

    _hidden[id] = !_hidden[id]
    this.setState({ hidden: _hidden })
  }



  render() {
    return (
      this.state.list ?
        <div>
          {this.state.list.map(list => {
            return (
              <div key={list._id} >
                  <h2>{list.name}</h2>
                  <span>{list.icon}</span>
                <Category listid={list._id}/>
                <button onClick={() => this.toggleForm(list._id)}>Add new category</button>
                <div hidden={this.state.hidden[list._id]}><CategoryForm toggleForm={() => this.toggleForm(list._id)} listid={list._id} /></div>
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