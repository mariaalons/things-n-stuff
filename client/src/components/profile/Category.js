import React, { Component } from 'react';
import Private from './Private'
import CardMedia from '@material-ui/core/CardMedia'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { categories : null};
    this.service = new Private();
  }

  componentWillMount() {
    this.service.showCategory(this.props.listid)
      .then(res => {  
        this.setState({ categories: [...res]});
      })
  }


  render() {
    return (
      this.state.categories ?
        <div>
          {this.state.categories.map(categories => {
            return (
             <button>Add to
              <div key={categories.name}>
                <h3>{categories.name}</h3>
                <span>{categories.icon}</span>
                
              </div>
              </button>
              
            )
          })
          }
        </div>
        : <p>Loading..</p>
    )
  }
}

export default Categories;