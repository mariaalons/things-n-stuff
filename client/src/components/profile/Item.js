import React, { Component } from 'react';
import { Draggable  } from 'react-beautiful-dnd';
import Private from './Private'

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = { item : null};
    this.service = new Private();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, refresh: nextProps["refresh"] })
    this.service.showItem(this.props.categoryid)
      .then(res => {  
        this.setState({ item: [...res]});
      })

  }  

  componentWillMount() {
    this.service.showItem(this.props.categoryid)
      .then(res => {  
        this.setState({ item: [...res]});
      })
  }


  render() {
    return (
      this.state.item ?
        <div>

          {this.state.item.map((item, index) => {
            return (
               <Draggable key={item._id} draggableId={item._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                    <h3>{item.name}</h3>
                    <img style={{width:100, height:100}} src={item.image} alt={item.name} />
                    <p>{item.description}</p>
                  </div>
                
                )}
                
              </Draggable>

            )
          })
          }

        </div>
        : <p>Loading..</p>
    )
  }
}

      
export default Items;