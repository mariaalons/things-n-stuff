import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className='home' >
      <div className='img column'>
        <img  alt='logo' src='https://res.cloudinary.com/dr1df4kwt/image/upload/v1539847265/folder-name/push-pin2.png'/>
        </div>
        <div className='column'>
        <h2>A Storage Unit for your mind</h2>
        </div>
      </div>
    );
  }
}

export default Home;