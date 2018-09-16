const chai = require('chai');
const chaiHttp = require('chai-http');

const mongoose = require("mongoose");
const Customer = require('../models/customer');
const should = chai.should();
const server = require('../../server');

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Customers', () => {
    beforeEach((done) => {
        Customer.remove({}, (err) => {
            done();
        });
    });
    /**
     * Test the /GET route
     */
    describe('/GET customers', () => {
        it('it should GET all the customers', (done) => {
            chai.request(server)
                .get('/api/v1/customers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
    * Test the /POST route
    */
    describe('/POST customer', () => {
        it('it should not POST a customer without gender', (done) => {
            const customer = {
                firstName: "Amine",
                lastName: "Rhouma",
                birthDate: "16-10-1989"
            }
            chai.request(server)
                .post('/api/v1/customers')
                .send(customer)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('it should POST a customer', (done) => {
            const customer = {
                firstName: "Amine",
                lastName: "Rhouma",
                gender: "m",
                birthDate: "1989-10-10",
                customerLifetimeValue: 50.99,
                lastContact: "2017-07-08T13:18:56.888Z"
            }
            chai.request(server)
                .post('/api/v1/customers')
                .send(customer)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('gender');
                    res.body.should.have.property('birthDate');
                    done();
                });
        });
    });
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id customer', () => {
        it('it should GET a customer by the given id', (done) => {
            var customer = new Customer({
                firstName: "Amine",
                lastName: "Rhouma",
                gender: "m",
                birthDate: "1989-10-10",
                lastContact: "2017-03-18T12:20:06.702Z"
            });
            customer.save((err, customer) => {
                chai.request(server)
                    .get('/api/v1/customers/' + customer._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstName');
                        res.body.should.have.property('lastName');
                        res.body.should.have.property('gender');
                        res.body.should.have.property('birthDate');
                        res.body.should.have.property('_id').eql(customer.id);
                        done();
                    });
            });
        });
    });
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id customer', () => {
        it('it should UPDATE a customer given the id', (done) => {
            const customer = new Customer({
                firstName: "Amine",
                lastName: "Rhouma",
                gender: "m",
                birthDate: "1989-10-10",
                lastContact: "2017-03-18T12:20:06.702Z"
            });
            customer.save((err, customer) => {
                chai.request(server)
                    .put('/api/v1/customers/' + customer._id)
                    .send({
                        firstName: "Khadija", // name of my dauther <3
                        gender: "w",
                        birthDate: "2017-07-27",
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstName').eql('Khadija');
                        res.body.should.have.property('gender').eql('w');
                        res.body.should.have.property('birthDate').eql('2017-07-27T00:00:00.000Z');
                        done();
                    });
            });
        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id customer', () => {
        it('it should DELETE a customer given the id', (done) => {
            const customer = new Customer({
                firstName: "Khadija",
                lastName: "Rhouma",
                gender: "w",
                birthDate: "2017-07-27",
                lastContact: "2017-03-18T12:20:06.702Z"
            });
            customer.save((err, customer) => {
                chai.request(server)
                    .delete('/api/v1/customers/' + customer._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstName').eql('Khadija');
                        done();
                    });
            });
        });
    });
});