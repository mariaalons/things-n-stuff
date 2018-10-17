import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Items from './Item'
import ItemForm from './ItemForm'
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Private from './Private'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { categories : null, hidden:{}};
    this.service = new Private();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, refresh: nextProps["refresh"] })
    this.service.showCategory(this.props.listid)
      .then(res => {  
        const categories = [...res]
        const hidden = {};
        categories.forEach(e => hidden[e._id] = true)
        this.setState({ categories , hidden});
      });

  } 
  componentWillMount() {
    this.service.showCategory(this.props.listid)
      .then(res => {  
        const categories = [...res]
        const hidden = {};
        categories.forEach(e => hidden[e._id] = true)
        this.setState({ categories , hidden});
      });
     
  }
  
  
  toggleForm(id){
    const _hidden = { ...this.state.hidden }

    _hidden[id] = !_hidden[id]
    this.setState({ hidden: _hidden })
  }

  handleClick(id) {
    this.service.deleteCategory(id)
    window.location.reload()
  }



  render() {
    return (
      this.state.categories ?
        <div className="columns is-desktop">
          {this.state.categories.map(categories => {
            return (
              <div className="column" key={categories._id}>
                <Droppable droppableId={categories._id}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <div style={{
                        backgroundColor: provided.isDragging ? 'green' : 'lightblue', height: 700, margin: 20
                      }}>
                        <div>
                          <span>{categories.icon}</span>
                          <h3 style={{ color: 'red' }}>{categories.name}</h3>
                          <Items refresh={this.state.refresh} categoryid={categories._id} />
                        </div>
                      </div>

                    </div>
                  )}

                </Droppable>
                <IconButton onClick={() => this.handleClick(categories._id)} aria-label="Delete">
                  <SvgIcon>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </SvgIcon>
                </IconButton>
                <button onClick={() => this.toggleForm(categories._id)}>Add new Item</button>
                <div hidden={this.state.hidden[categories._id]}><ItemForm toggleForm={() => this.toggleForm(categories._id)} categoryid={categories._id} /></div>
              </div>
            )
          })
          }
        </div>

        : <p>Loading..</p>
    )
  }
}

export default Categories;