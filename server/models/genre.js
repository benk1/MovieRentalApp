const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}
exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;

