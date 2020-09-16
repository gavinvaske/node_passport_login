const express = require('express');
const router = express.Router();

router.get('/login', (request, response) => {
    response.render('login');
});

router.get('/register', (request, response) => {
  response.render('register');
});

router.post('/register', (request, response) => {
  const {name, email, password, password2} = request.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({msg: 'Please fill in all fields'});
  }
  // Check passwords match
  if (password != password2) {
    errors.push({msg: 'Passwords do not match'});
  }
  // Check passwords length
  if (password.length < 6) {
    errors.push({msg: 'Password must be at least 6 characters'});
  }
  if (errors.length > 0) {
    response.render('register', {
      errors: errors,
      ...request.body

    });
  } else {
    response.send('Pass');
  }
});

module.exports = router;