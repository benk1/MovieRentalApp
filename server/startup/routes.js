const express = require('express');
const genres = require('../routes/genres');

const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const returns = require('../routes/returns');
const home = require('../routes/home');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + ' /public'));
  //app.use(helmet());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/', home);
  app.use('/api/returns', returns);
  app.use(error);
  app.use(cors());
  app.use(bodyParser.json());
  //app.use(logger);
  //app.use(authenticate);
};
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  debug('Morgan enabled...');
}
