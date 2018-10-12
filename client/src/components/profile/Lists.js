import React, { Component } from 'react';
import Private from './Private'

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { list : null};
    this.service = new Private();
  }

  componentDidMount() {
    this.service.showList()
      .then(res => {
        console.log(res)
        const list = res;
        this.setState({ list : [...res]});
      })
  }

  render() {
    return (
      this.state.list ?
      <ul>
        {this.state.list.map(list => {
          return (
            <div>
              <li>{list.name}</li>
              <span role="img" aria-label={list.icon}>{list.icon}</span>
              <button>Add new category</button>
              <button>Add new Item</button>
            </div>
          )
        })
        }
      </ul>
      : <p>Loading..</p>
    )
  }
}


export default Lists;