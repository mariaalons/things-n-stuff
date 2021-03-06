import axios from 'axios';

class Private {
  constructor() {
    this.service = axios.create({
      baseURL:`${process.env.REACT_APP_API_URL}/profile`,
      withCredentials: true
    });
  }
  profile = (userId, name, icon) => {
    return this.service.post('/list', {userId, name, icon})
    .then(response => response.data)
  }
  showList = () => {
    return this.service.get('/list')
    .then(response => { 
      return response.data})
  }

  deleteList = (listId) => {
    return this.service.delete(`/list/${listId}`)
    .then(response => { 
      return response.data})
  }

  item = (categoryId, name, description, image) => {
    const formData = new FormData();
    formData.append("photo", image)
    formData.append("categoryId", categoryId)
    formData.append("name", name)
    formData.append("description", description)
    return this.service.post('/item', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(response => {
      return response.data})
  }
  showItem = (categoryId) => {
    return this.service.get(`/item/${categoryId}`)
    .then(response => { 
      return response.data})
  }

  category = (listId, name, icon) => {
    return this.service.post('/category', {listId, name, icon})
    .then(res => {
      return res.data})
  }

  showCategory = (listId) => {
    return this.service.get(`/category/${listId}`)
    .then(response => { 
      return response.data})
  }

  updateCategory = (itemId,categoryId) => {
    return this.service.put(`/item/${itemId}`,{categoryId})
    .then(response => { 
      return response.data})
  }

  deleteItem = (itemId) => {
    return this.service.delete(`/item/${itemId}`)
    .then(res => {
      return res.data
    })
  }

  deleteCategory = (categoryId) => {
    return this.service.delete(`/category/${categoryId}`)
    .then(res => {
      return res.data
    })
  }
}




export default Private;