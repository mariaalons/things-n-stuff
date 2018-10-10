const express = require('express');
const router = express.Router();
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const _ = require('lodash');
const List = require('../models/List')


router.post('/profile/list', (req, res, next) => {
  const {
    userId,
    name,
    icon
  } = req.body;
  console.log(req.body)

  const userID = req.user;
  console.log(req.user)
  const newList = new List({
    userId: userID,
    name,
    icon
  }).save()
  .then(List => res.status(200).json({
    status: 'List created',
  }))
.catch(e => next(e))
})










module.exports = router;