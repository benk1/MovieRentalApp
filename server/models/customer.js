const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  { timestamps: true }
);
const Customer = mongoose.model('Customer', genreSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
