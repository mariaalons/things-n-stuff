const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      console.log('req.login ')
      console.log(user)

      
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}

router.post("/signup", (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body
  console.log(req.body)
  if (!username || !password) {
    next(new Error('You must provide valid credentials'));
  }

  User.findOne({
      username
    })
    .then(user => {
      if (user) throw new Error('Username already exists');

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashPass
      }).save()
      .then(newUser => login(req, newUser))
      .then(user => res.json({
        status: 'signup & login successfully',
        user
      }))
    })
    .catch(e => next(e));
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    
    if (err) next(new Error('Something went wrong')); 
    if (!theUser) next(failureDetails)
    login(req, theUser).then(user => res.status(200).json(req.user));

  })(req, res, next);
});

router.get('/currentuser', (req,res,next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    next(new Error('Not logged in'))
  }
})

router.get('/logout', (req,res) => {
  req.logout();
  res.status(200).json({message:'logged out'})
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})


module.exports = router;
