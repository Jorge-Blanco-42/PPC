'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var OrderSchema = Schema({
    number: String,
    phoneNumber: String,
    total: String,
    date: Date
});

