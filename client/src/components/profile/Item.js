import React, { Component } from 'react';
import Private from './Private'
import Category from './Category'
import CardMedia from '@material-ui/core/CardMedia'

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
                <img src={item.image} alt={item.name} />
                <p>{item.description}</p>
                {/* select button with categories */}
                {/* <button itemId={}>Add item to category</button> */}
               <Category listid={this.props.listid}/>
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