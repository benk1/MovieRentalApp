const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const authenticate = require('./authenticate');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
//app.set('views', './views');

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

//Configuration
console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));
//console.log('Mail Password:' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

//Db work
//dbDebugger('Connected to the db');

app.use(logger);

app.use(authenticate);

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
  res.render('index.pug', {
    title: 'My Express App',
    message: 'Hello Welcome To Movie Rental App',
  });
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  //if invalid,return 400 - bad req
  if (error)
    //400 bad req
    return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  //Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //If not existing, return 404
  if (!course)
    return res.status(404).send('The course with the given ID was not found!');
  //validate
  const { error } = validateCourse(req.body);
  //if invalid,return 400 - bad req
  if (error) {
    //400 bad req
    res.status(400).send(error.details[0].message);
    return;
  }
  //Update course
  course.name = req.body.name;
  //Return the updates course
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  //Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //Not existing,return 404
  if (!course)
    return res.status(404).send('The course with the given ID was not found!');

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //Return the same course
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found!');
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
