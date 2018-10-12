const express = require('express');
const router = express.Router();
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const _ = require('lodash');
const List = require('../models/List')


router.post('/list', (req, res, next) => {
  const {
    userId,
    name,
    icon
  } = req.body;
  console.log(req.body)

  console.log(req.user)
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

router.post('/list/item', (req, res, next) => {
  const {
    listId,
    name,
    descrption
  } = req.body;
  console.log(req.body)

  console.log(req.list)
  const newItem = new Item({
    listId,
    name,
    descrption
  }).save()
  .then(Item => res.status(200).json({
    status: 'List created',
  }))
.catch(e => next(e))
})

router.get('/list/Item', (req, res, next) => {
  Item.find(req.list.id)
  .then(data => res.status(200).json(data))
  .catch(e => next(e))
}) 

module.exports = router;