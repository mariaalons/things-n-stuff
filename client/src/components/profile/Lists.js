import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
import Private from './Private'
import ItemForm from './ItemForm'
import CategoryForm from './CategoryForm'
import Category from './Category'
import Items from './Item'

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { list : null, category: null, hidden:{}};
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

  onDragEnd = () => {
    // the only one that is required
  };

  render() {
    return (
      this.state.list ?
        <div>
          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
            {this.state.list.map(list => {
              return (
                <div key={list.name}>
                  <div>
                    <h2>{list.name}</h2>
                    <span>{list.icon}</span>
                  </div>
                  <Droppable droppableId="droppable-1">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div style={{
              backgroundColor: provided.isDragging ? 'green' : 'lightblue', height:500
             }}>
                          <Category listid={list._id}>
                         
                          </Category>
                        </div>
                        <Draggable draggableId="draggable-1" index={0}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className='item card'>
                                <Items listid={list._id} />
                              </div>
                            </div>
                          )}
                        </Draggable>
                  </div>
                    )}
                  </Droppable>
                  <button onClick={() => this.toggleForm(list._id)}>Add new category</button>
                  <button onClick={() => this.toggleForm(list._id)}>Add new Item</button>
                  <div hidden={this.state.hidden[list._id]}><ItemForm toggleForm={() => this.toggleForm(list._id)} listid={list._id} /></div>
                  <div hidden={this.state.hidden[list._id]}><CategoryForm toggleForm={() => this.toggleForm(list._id)} listid={list._id} /></div>
                </div>
              )
            })
            }
          </DragDropContext>
        </div>
        : <p>Loading..</p>
    )
  }
}


export default Lists;