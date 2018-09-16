const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");

const Customer = require('../models/customer');
const should = chai.should();
const server = require('../../server');

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Customers V2', () => {
    beforeEach((done) => {
        Customer.remove({}, (err) => {
            const data = require('./data/customers.json');
            Customer.insertMany(data, (err, customers) => {
                done();
            });
        });
    });
    /**
     * Test the /GET route for version 2
     */
    describe('/GET customers', () => {
        it('it should GET all the customers using pagination', (done) => {
            chai.request(server)
                .get('/api/v2/customers?limit=2&offset=1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.customers.should.be.a('array');
                    res.body.customers.length.should.be.eql(2);
                    done();
                });
        });
    });
});