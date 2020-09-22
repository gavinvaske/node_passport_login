const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.get('/', (request, response) => {
    response.render('welcome');
});

router.get('/dashboard', ensureAuthenticated, (request, response) => {
  response.render('dashboard', {
    user: request.user
  });
});

module.exports = router;