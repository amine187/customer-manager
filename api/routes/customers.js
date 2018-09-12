const express = require('express');
const router = express.Router();

const Customer = require('../models/customer');

/**
 * Get customer by ID
 */
router.get('/:id', (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) return res.status(500).send("There was a problem finding the customer.");
        if (!customer) return res.status(404).send("No customer found.");
        res.status(200).send(customer);
    });
});
/**
 * Get all customers
 */
router.get('/', (req, res) => {
    Customer.find({}, (err, customers) => {
        if (err) return res.status(500).send("There was a problem display customers.");
        res.status(200).send(customers);
    });
});
/**
 * Create a new customer
 */
router.post('/', (req, res) => {
    let newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthDate: new Date(req.body.birthDate),
        lastContact: new Date(req.body.lastContact),
        customerLifetimeValue: req.body.customerLifetimeValue,
    });
    
    newCustomer.save((err, customer) => {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(201).send(customer);
    });
});
/**
 * Update a customer by id
 */
router.put('/:id', (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, customer) => {
        if (err) return res.status(500).send("There was a problem updating the customer.");
        res.status(200).send(customer);
    });
});
/**
 * Delete a customer by id
 */
router.delete('/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, customer) => {
        if (err) return res.status(500).send("There was a problem deleting the customer.");
        res.status(200).send(customer);
    });
});

module.exports = router;