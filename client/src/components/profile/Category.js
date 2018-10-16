import React, { Component } from 'react';

import Private from './Private'

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
             
              <div key={categories.name}>
                <h3 style={{color : 'red'}}>{categories.name}</h3>
                <span>{categories.icon}</span>
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