const express = require('express');
const router = express.Router();

const Customer = require('../models/customer');

/**
 * Get all customers using the pagination. 
 * 
 * @desc If we have many items in a list, we need to display it by limit and offset.
 * @desc limit variable contains max number of items on each page, offset variable contains current page number.
 */
router.get('/', (req, res) => {
    let limit = Math.trunc(req.query.limit) || 10;
    let offset = Math.trunc(req.query.offset) || 1;

    Customer
        .find({})
        .skip((limit * offset) - limit)
        .limit(limit)
        .exec((err, customers) => {
            Customer.count().exec((err, count) => {
                if (err) return res.status(500).send("There was a problem display customers.");
                res.send({
                    customers: customers,
                    current: offset,
                    pages: Math.ceil(count / limit)
                })
            })
        })
});


module.exports = router;