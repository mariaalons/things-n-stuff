import React, { Component } from 'react';
import Private from './Private'
import SvgIcon from '@material-ui/core/SvgIcon';
import CategoryForm from './CategoryForm'
import Category from './Category'


class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { list : null, hidden:{}, refresh: false , listVisibilities: {}};
    this.service = new Private();
    this.visible = false
    this.theClassName = ""
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, refresh: nextProps["refresh"] })
    this.service.showList()
      .then(res => {
        const list = [...res]
        const hidden = {};
        // const listVisibilities = {};
        list.forEach(e => hidden[e._id] = true)
        // list.forEach(e => listVisibilities[e._id] = false)
        this.setState({ list , hidden});
      })

  }
 
  componentDidMount() {
    this.service.showList()
      .then(res => {
        const list = [...res]
        const hidden = {};
        const listVisibilities = {};
        list.forEach(e => hidden[e._id] = true)
        list.forEach(e => listVisibilities[e._id] = false)

        this.setState({ list , hidden, listVisibilities});
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

  toggleVisibility = (id) => {
    const _listVisibilities = { ...this.state.listVisibilities }
    _listVisibilities[id] = !_listVisibilities[id]
    this.setState({ listVisibilities: _listVisibilities })  
  }

  render() {
    return (
      this.state.list ?
        <div>
          {this.state.list.map((list, i) => {
            return (
              <div className="list-column" key={list._id} >
              <div className="list-name" onClick={() => this.toggleVisibility(list._id)}>
              
                  <h2> <span>{list.icon}</span> {list.name}</h2>
                 
                  </div>
                <div className={this.state.listVisibilities[list._id] === false ? "hidden" : ""}>
                  <Category refresh={this.state.refresh} listid={list._id} />
                  <button className="button is-new" onClick={() => this.toggleForm(list._id)}>Add new category</button>
                  <button className="button delete-btn" onClick={() => this.handleClick(list._id)}>
                    <SvgIcon>
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </SvgIcon>
                  </button>
                  <div hidden={this.state.hidden[list._id]}><CategoryForm toggleForm={() => this.toggleForm(list._id)} listid={list._id} /></div>
                  </div>
                </div>
            )
          })
          }
        </div>
        : <a className="button is-loading">Loading</a>
    )
  }
}


export default Lists;