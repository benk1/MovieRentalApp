const winston = require('winston')
const express = require('express');
//const dotenv = require('dotenv');
const connectDB = require('./config/db');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
//const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const authenticate = require('./authenticate');

//dotenv.config({ path: './config/config.env' });
const app = express();

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()

//app.set('view engine', 'pug');
//app.set('views', './views');
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

//console.log('Mail Password:' + config.get('mail.password'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));
