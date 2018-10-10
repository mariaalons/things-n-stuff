import axios from 'axios';

class Private {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/profile',
      withCredentials: true
    });
  }
  profile = (user, name, icon) => {
    return this.service.post('/list', {user, name, icon})
    .then(response => response.data)
  }
}


export default Private;