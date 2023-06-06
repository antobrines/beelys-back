const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config');
const routes = require('./routes');
const errorF = require('./utils/error');

const app = express();
app.set('trust proxy', 1);
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

// Routes to test the API
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄👨‍🔧🐱‍🚀✌',
    env: config.environment,
    port: config.port,
    version: config.version
  });
});

// Handle syntax error
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    errorF(error.message, error, 500, res, next);
  } else {
    next();
  }
});

// All the api routes
app.use('/api', routes);

// Error handling not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  const errorMessage = {
    message: `🔍 - Not Found - ${req.originalUrl}`
  };
  res.json(errorMessage);
  next();
});

module.exports = app;