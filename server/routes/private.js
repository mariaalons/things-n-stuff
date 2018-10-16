const uploadCloud= require('../config/cloudinary');
const express = require('express');
const router = express.Router();
const List = require('../models/List')
const Item = require('../models/Item')
const Category = require('../models/Category')


router.post('/list', (req, res, next) => {
  const {
    userId,
    name,
    icon
  } = req.body;
  
  const newList = new List({
    userId,
    name,
    icon
  }).save()
  .then(List => res.status(200).json({
    status: 'List created',
  }))
.catch(e => next(e))
})

router.get('/list', (req, res, next) => {
  List.find({userId: req.user._id})
  .then(data => res.status(200).json(data))
  .catch(e => next(e))
}) 

router.post('/item',uploadCloud.single('photo'), (req, res, next) => {
  const {
    listId,
    categoryId,
    name,
    description
  } = req.body;
  const image = req.file.url;
  const newItem = new Item({
    listId,
    categoryId,
    name,
    description,
    image
  }).save()
  .then(Item => res.status(200).json({
    status: 'Item created',
  }))
.catch(e => next(e))
})

router.get('/item/:listId', (req, res, next) => {
  Item.find({listId: req.params.listId})
  .then(data => res.status(200).json(data))
  .catch(e => next(e))
}) 

router.post('/category', (req, res, next) => {
  const {
    listId,
    name,
    icon
  } = req.body;
  
  const newCategory = new Category({
    listId,
    name,
    icon,
  }).save()
  .then(Category => res.status(200).json({
    status: 'Category created',
  }))
.catch(e => next(e))
})

router.get('/category/:listId', (req, res, next) => {
  Category.find({listId: req.params.listId})
  .then(data => res.status(200).json(data))
  .catch(e => next(e))
}) 

module.exports = router;