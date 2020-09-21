const express = require('express');
const router = express.Router();

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
];
router.get('/', (req, res) => {
  res.send(genres);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  //if invalid,return 400 - bad req
  if (error)
    //400 bad req
    return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  //Look up the course
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  //If not existing, return 404
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found!');
  //validate
  const { error } = validateCourse(req.body);
  //if invalid,return 400 - bad req
  if (error) {
    //400 bad req
    res.status(400).send(error.details[0].message);
    return;
  }
  //Update genre
  genre.name = req.body.name;
  //Return the updates course
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  //Look up the course
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  //Not existing,return 404
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found!');

  //delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  //Return the same genre
  res.send(genre);
});

router.get('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found!');
  res.send(genre);
});

function validateCourse(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
