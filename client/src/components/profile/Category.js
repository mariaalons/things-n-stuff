import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Items from './Item'
import ItemForm from './ItemForm'
import Private from './Private'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { categories : null, hidden:{}};
    this.service = new Private();
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



  render() {
    return (
      this.state.categories ?
        <div>
          {this.state.categories.map(categories => {
            return (
              <div key={categories._id}>
              <Droppable droppableId={categories._id}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div style={{
                          backgroundColor: provided.isDragging ? 'green' : 'lightblue', height: 700, margin:20
                        }}>
                        <div>
                     <span>{categories.icon}</span>
                <h3 style={{color : 'red'}}>{categories.name}</h3>
                <Items categoryid={categories._id}/>
                </div>
                </div>
             
                 </div>
                )}
                
                  </Droppable>
                  <button onClick={() => this.toggleForm(categories._id)}>Add new Item</button>
                   <div hidden={this.state.hidden[categories._id]}><ItemForm toggleForm={() => this.toggleForm(categories._id)} categoryid={categories._id}/></div>
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