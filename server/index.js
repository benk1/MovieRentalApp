const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env' });
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const home = require('./routes/home');
const authenticate = require('./authenticate');
const mongoose = require('mongoose');

connectDB();

//Load config
const app = express();

//connect to mongodb
/*const dbURI =
  'mongodb+srv://ben-rwiza_10:4mathias@node-movie-rental.4b9wh.mongodb.net/movieRental?retryWrites=true&w=majority';*/

/*mongoose
  .connect(process.env.MONGODB_URI || dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`Connected to MongoDB and Listening on port ${port}...`)
    );
  })
  .catch((err) => console.log(err));*/

//app.set('view engine', 'pug');
//app.set('views', './views');

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
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
