'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['w', 'm'],
        required: true
    },
    birthDate: {
        type: Date,
        index: true,
        required: true,
    },
    lastContact: {
        type: Date,
        index: true,
        required: true,
    },
    customerLifetimeValue: {
        type: Number,
        default: 0
    }
}, {
        versionKey: false,
    });

module.exports = mongoose.model('Customer', customerSchema);
