import React, { Component } from 'react';
import { Draggable  } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
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

  handleClick(id) {
    this.service.deleteItem(id)
    window.location.reload()
  }


  render() {
    return (
      this.state.item ?
        <div style={{ margin: 15 }}>

          {this.state.item.map((item, index) => {
            return (
              <Draggable key={item._id} draggableId={item._id} index={index}>

                {(provided, snapshot) => (
                  <div className='item-content'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >


                    <Card className='card-m'>
                      <CardContent>

                        <div className='card-img'>
                          <img src={item.image} alt={item.name} />

                          <p><h3>{item.name}</h3>{item.description}</p>
                        </div>
                        <button className="button delete-btn" onClick={() => this.handleClick(item._id)} aria-label="Delete">
                          <SvgIcon>
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </SvgIcon>
                        </button>
                      </CardContent>
                    </Card>

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