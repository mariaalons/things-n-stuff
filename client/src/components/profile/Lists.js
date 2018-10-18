import React, { Component } from 'react';
import Private from './Private'
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import CategoryForm from './CategoryForm'
import Category from './Category'


class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { list : null, hidden:{}, refresh: false};
    this.service = new Private();
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, refresh: nextProps["refresh"] })
    this.service.showList()
      .then(res => {
        const list = [...res]
        const hidden = {};
        list.forEach(e => hidden[e._id] = true)
        this.setState({ list , hidden});
      })

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

  handleClick(id) {
    this.service.deleteList(id)
    window.location.reload()
  }

  render() {
    return (
      this.state.list ?
        <div>
          {this.state.list.map(list => {
            return (
              <div className='list-column' key={list._id} >
              <div className="list-name">
              
                  <h2> <span>{list.icon}</span> {list.name}</h2>
                 
                  </div>
                <Category refresh={this.state.refresh} listid={list._id}/>
                <button onClick={() => this.toggleForm(list._id)}>Add new category</button>
                <div hidden={this.state.hidden[list._id]}><CategoryForm toggleForm={() => this.toggleForm(list._id)} listid={list._id} /></div>
                <IconButton onClick={() => this.handleClick(list._id)} aria-label="Delete">
                  <SvgIcon>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </SvgIcon>
                </IconButton>
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