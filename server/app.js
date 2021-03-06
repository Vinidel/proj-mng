const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const authorizationRoutes = require('./routes/authorization');
const loggedIn = require('./middleware/loggedIn');

const app = express();

// Data parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(cors());

// Logging
app.use(morgan('dev'));

// Health check
app.get('/api/sup', (req, res) => {
  res.status(200).json({ message: 'Whats up' });
});

// Auth
app.use((req, res, next) => {
  // this must be used to handle all authentication for the api
  // console.log('Heyyyyy yeah');
  next();
});

// Routes
app.use('/api/login', authorizationRoutes);
app.use('/api/projects', loggedIn, projectRoutes);
app.use('/api/users', loggedIn, userRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res
    .status(error.status || 500)
    .json({
      error: {
        message: error.message,
      },
    });
});

module.exports = app;
