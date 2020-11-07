/*const winston = require('winston')
const mongoose = require('mongoose');

module.exports = function(){
    mongoose
  .connect('mongodb://localhost/movieRental', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => winston.info('Mongodb connected...'))
  //.catch((err) => winston.info('COULD NOT CONNECT TO MongoDB!!',err));
//connectDB();
}*/
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
const dbUri =
  ' mongodb://ben-rwiza_10:4mathias@node-movie-rental-shard-00-00.4b9wh.mongodb.net:27017,node-movie-rental-shard-00-01.4b9wh.mongodb.net:27017,node-movie-rental-shard-00-02.4b9wh.mongodb.net:27017/movieRental?ssl=true&replicaSet=atlas-zp5x9i-shard-0&authSource=admin&retryWrites=true&w=majority';
module.exports = function () {
  const db = config.get('db');
  
  mongoose.connect(dbUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => winston.info(`CONNECTED TO ${db}...`));
};
