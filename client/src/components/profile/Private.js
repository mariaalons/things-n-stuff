import axios from 'axios';

class Private {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/profile',
      withCredentials: true
    });
  }
  profile = (userId, name, icon) => {
    return this.service.post('/list', {userId, name, icon})
    .then(response => response.data)
  }
  showList = () => {
    return this.service.get('/list')
    .then(response => { console.log(response)
      return response.data})
  }
  
}




export default Private;