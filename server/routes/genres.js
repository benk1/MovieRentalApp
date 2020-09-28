const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const router = express.Router();

const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validateCourse(req.body);
  //if invalid,return 400 - bad req
  if (error)
    //400 bad req
    return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCourse(req.body);
  //if invalid,return 400 - bad req
  if (error) {
    //400 bad req
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  //Look up the course
  //const genre = genres.find((c) => c.id === parseInt(req.params.id));
  //If not existing, return 404
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found!');
  //validate

  //Update genre
  //genre.name = req.body.name;
  //Return the updates course
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  //Look up the course
  //const genre = genres.find((c) => c.id === parseInt(req.params.id));
  //Not existing,return 404
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found!');

  /*delete from an array
  const index = genres.indexOf(genre);
  genres.splice(index, 1);*/

  //Return the same genre
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  //const genre = genres.find((c) => c.id === parseInt(req.params.id));
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
