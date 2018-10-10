const express = require('express');
const router = express.Router();
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const passport = require('passport');
const _ = require('lodash');
const List = require('../models/List')

const list = (Model) =>{
  let notUsedPaths = ['_id','updated_at','created_at','__v'];
  let paths = Object.keys(Model.schema.paths).filter(e => !notUsedPaths.includes(e));

  router.post('/',ensureLoggedIn('/auth/login'),(req,res,next) => {
    const object = _.pickBy(req.body, (e,k) => paths.includes(k));
    Model.create(object)
        .then( obj => res.status(200).json(obj))
        .catch(e => next(e))
})
}









module.exports = router;