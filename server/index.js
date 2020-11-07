const winston = require('winston');
const express = require('express');
//const dotenv = require('dotenv');
const connectDB = require('./config/db');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const authenticate = require('./authenticate');
const config = require('config');
//const cors = require('cors');

//dotenv.config({ path: './config/config.env' });
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

//app.use(cors());

//app.set('view engine', 'pug');
//app.set('views', './views');
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

//console.log('Mail Password:' + config.get('mail.password'));
const PORT = process.env.PORT || config.get('port');
const server = app.listen(PORT, () =>
  winston.info(`Listening on port ${PORT}...`)
);

module.exports = server;
