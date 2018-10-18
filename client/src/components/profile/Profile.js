import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CardMedia from '@material-ui/core/CardMedia';
import Auth from '../auth/Auth'
import Lists from './Lists'
import ListForm from './ListForm'
import Private from './Private'




class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null ,
    hidden:true,
    refresh: false,
    explore: null
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
    let refresh= !this.state.refresh
   this.setState({refresh})
  

  }

  //https://api.themoviedb.org/3/movie/55?api_key=59387977c6cfbf0bdc57342d0185a34d

  handleClick = () =>{
    let movieNumber = Math.floor(Math.random() * 600) + 1;
  axios.get(`https://api.themoviedb.org/3/movie/${movieNumber}?api_key=${process.env.REACT_APP_API_KEY_MOVIE}`)
  .then (movie => {
    
   this.setState({explore:movie.data}) 
   console.log(this.state.explore)
  })
  }


  render() {
    this.fetchUser()
    let basePath= 'http://image.tmdb.org/t/p/w185//'
      return (
        
        <DragDropContext
        onDragEnd={this.onDragEnd}>
         <div>
         <div>
           <h1>This are your lists {this.props.userInSession.username}</h1>
           <img className="round" src={this.props.userInSession.image} alt={this.props.userInSession.usename}/>
           </div>
           <button className="button is-primary" onClick={()=>this.handleClick()}>Explore</button>
          <button className="button is-light" onClick={() => this.toggleForm()}>Create new list</button>
         <div hidden={this.state.hidden}><ListForm toggleForm={() => this.toggleForm()} userInSession={this.state.loggedInUser} getUser={this.getTheUser}/></div>
          <div className='column is-one-quarter-fullhd'>
          <div>
           { this.state.explore ? 
           <div>
               <Card>
               <CardContent>
           <h2>{this.state.explore.original_title}</h2> 
           <CardMedia>
           <img src={basePath + this.state.explore.poster_path} alt={this.state.explore.original_title}/>
           </CardMedia>
           <p>{this.state.explore.overview}</p>
           </CardContent>
           </Card>
           </div>
           : ""}
    
          </div>
          <Lists refresh={this.state.refresh} className="list-box"/>  
          </div>
          </div> 
      </DragDropContext>
     
   
    )
}
}


export default Profile;