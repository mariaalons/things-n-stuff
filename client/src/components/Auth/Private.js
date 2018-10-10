import axios from 'axios';

class Private {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/auth',
      withCredentials: true
    });
  }
}


export default Private;