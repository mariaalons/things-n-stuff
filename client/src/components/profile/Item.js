import React, { Component } from 'react';
import Private from './Private'

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = { item : null};
    this.service = new Private();
  }

  componentWillMount() {
    this.service.showItem(this.props.listid)
      .then(res => {  
        this.setState({ item: [...res]});
      })
  }

  render() {
    return (
      this.state.item ?
      <div>
        {this.state.item.map(item => {
          return (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>  
            </div>
          )
        })
        }
      </div>
      : <p>Loading..</p>
    )
  }
}


export default Items;