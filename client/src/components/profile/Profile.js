import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Auth from '../auth/Auth'
import Lists from './Lists'
import ListForm from './ListForm'
import Private from './Private'




class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null ,
    hidden:true,
    refresh: false
    
  };
    this.route = new Private();
    this.service = new Auth();
  }


  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
  toggleForm(){
    const hidden = !this.state.hidden
    this.setState({hidden:hidden})
  }

 

  onDragEnd = (result) => {
    
    let itemId = result.draggableId
    let newCategoryId = result.destination.droppableId;
    this.route.updateCategory(itemId,newCategoryId)
    //window.location.reload()
    let refresh= !this.state.refresh
   this.setState({refresh})
  

  }


  render() {
    this.fetchUser()
      return (
        
        <DragDropContext
        onDragEnd={this.onDragEnd}>
         <div>
         <div>
           <h1>This are your lists {this.props.userInSession.username}</h1>
           <img src={this.props.userInSession.image} alt=''/>
           </div>
          <button onClick={() => this.toggleForm()}>Create new list</button>
         <div hidden={this.state.hidden}><ListForm toggleForm={() => this.toggleForm()} userInSession={this.state.loggedInUser} getUser={this.getTheUser}/></div>
          <div className='column is-one-quarter-fullhd' style={{backgroundColor: 'gray', margin:10}}>
          <Lists refresh={this.state.refresh} className="list-box"/>  
          </div>
          </div> 
      </DragDropContext>
     
   
    )
}
}


export default Profile;