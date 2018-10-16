const uploadCloud= require('../config/cloudinary');
const express = require('express');
const router = express.Router();
const List = require('../models/List')
const Item = require('../models/Item')
const Category = require('../models/Category')


router.post('/list', (req, res, next) => {
  const {
    userId,
    categoriesId,
    name,
    icon
  } = req.body;
  
  const newList = new List({
    userId,
    categoriesId,
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
    categoryId,
    name,
    description
  } = req.body;
  const image = req.file.url;
  const newItem = new Item({
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

router.get('/item/:categoryId', (req, res, next) => {
  Item.find({categoryId: req.params.categoryId})
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

router.put('/item/:itemId', (req, res, next) => {
  Item.findByIdAndUpdate(req.params.itemId,{"categoryId": req.body.categoryId})
  .then(data => res.status(200).json(data))
  .catch(e => next(e))
}) 


module.exports = router;