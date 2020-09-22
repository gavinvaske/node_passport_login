const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const flash = require('connect-flash');
const session = require('express-session');

if (env.error) {
  console.log('Error loading .env');
}

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error));

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded({extended: false}));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Connect Flash
app.use(flash());
 
// Global Variables
app.use((request, response, next) => {
  response.locals.success_msg = request.flash('success_msg');
  response.locals.error_msg = request.flash('error_msg');
  next();
});
const PORT = process.env.PORT || 3000;

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Server started on PORT = ${PORT}`));