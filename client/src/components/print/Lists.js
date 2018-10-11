import React, { Component } from 'react';
import axios from 'axios';

class Lists extends Component {
  state = {
      list: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/profile/list`)
      .then(res => {
        const list = res.data;
        this.setState({ list });
      })
  }

  render() {
    return (
      <ul>
        { this.state.list.map(person => <li>{person.name}</li>)}
      </ul>
    )
  }
}


export default Lists;