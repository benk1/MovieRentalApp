const { Customer, validate } = require('../models/customer');
//const Joi = require('joi');
//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  //if invalid,return 400 - bad req
  if (error)
    //400 bad req
    return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    name: req.body.phone,
    name: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  //if invalid,return 400 - bad req
  if (error) {
    //400 bad req
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { name: req.body.phone },
    { name: req.body.isGold },
    { new: true }
  );

  //If not existing, return 404
  if (!customer)
    return res
      .status(404)
      .send('The customer with the given ID was not found!');
  //validate

  //Update customer
  //customer.name = req.body.name;
  //Return the updates customer
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  //Not existing,return 404
  if (!customer)
    return res
      .status(404)
      .send('The customer with the given ID was not found!');

  //Return the same customer
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send('The customer with the given ID was not found!');
  res.send(customer);
});

module.exports = router;
