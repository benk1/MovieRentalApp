const winston = require('winston')
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
}