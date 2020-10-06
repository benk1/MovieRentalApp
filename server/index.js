const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
//const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const home = require('./routes/home');
const authenticate = require('./authenticate');

//dotenv.config({ path: './config/config.env' });
const app = express();
//Load config
/*const dbURI =
  'mongodb+srv://ben-rwiza_10:4mathias@node-movie-rental.4b9wh.mongodb.net/movieRental?retryWrites=true&w=majority;'*/
mongoose
  .connect('mongodb://localhost:27017/movieRental', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log('Mongodb connected...'))
  .catch((err) => console.log(err));
//connectDB();
//app.set('view engine', 'pug');
//app.set('views', './views');

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/', home);
//app.use(logger);
//app.use(authenticate);

//Configuration
console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));
//console.log('Mail Password:' + config.get('mail.password'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  debug('Morgan enabled...');
}
//Db work
//dbDebugger('Connected to the db');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
