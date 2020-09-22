const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

router.get('/login', (request, response) => {
    response.render('login');
});

router.get('/register', (request, response) => {
  response.render('register');
});

router.post('/register', (request, response) => {
  const {name, email, password, password2} = request.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({msg: 'Please fill in all fields'});
  }
  if (password != password2) {
    errors.push({msg: 'Passwords do not match'});
  }
  if (password.length < 6) {
    errors.push({msg: 'Password must be at least 6 characters'});
  }
  if (errors.length > 0) {
    response.render('register', {
      errors: errors,
      ...request.body
    });
  } else {
    User.findOne({email: email})
      .then((user) => {
        if (user) {
          errors.push({msg: 'Account with that email already exists'});
          response.render('register', {
            errors: errors,
            ...request.body
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          // Hash Password
          bcrypt.genSalt(10, (error, salt) => {
              bcrypt.hash(newUser.password, salt, (error, hash) => {
                if (error) {
                  throw error;
                }
                newUser.password = hash;
                newUser.save()
                  .then(user => {
                    request.flash('success_msg', 'You are now registered!');
                    response.redirect('/users/login');
                  })
                  .catch(error => {
                    console.log(error);
                  });
            });
          });
        }
      });
  }
});

module.exports = router;