import React, { Component } from 'react';
import { Draggable  } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
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
   
  }


  render() {
    return (
      this.state.item ?
        <div style={{ width: 150 }}>

          {this.state.item.map((item, index) => {
            return (
              <Draggable key={item._id} draggableId={item._id} index={index}>

                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card>
                      <CardContent>
                        <h3>{item.name}</h3>
                        <CardMedia>
                          <img style={{ width: 100, height: 100 }} src={item.image} alt={item.name} />
                        </CardMedia>
                      
                          <p>{item.description}</p>
                   
                        <CardActions>
                          <IconButton onClick={() => this.handleClick(item._id)} aria-label="Delete">
                            <SvgIcon>
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </SvgIcon>
                          </IconButton>
                          <IconButton aria-label="Edit">
                            <SvgIcon>
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </SvgIcon>
                          </IconButton>

                        </CardActions>
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