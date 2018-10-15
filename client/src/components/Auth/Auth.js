import axios from 'axios';


class Auth {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3001/api/auth',
      withCredentials: true
    });
  }

  signup = (username, password, email, image) => {
    console.log(image)

    const formData = new FormData();
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
      formData.append("photo", image)
    return this.service.post('/signup', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentuser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

export default Auth;