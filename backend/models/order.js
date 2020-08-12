'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


var Schema = mongoose.Schema;
var OrderSchema = Schema({
    number: String,
    total: String,
    date: Date,
    state: String,
    problem: String,
    payment: String,
    products : []

});

module.exports = mongoose.model("order", OrderSchema);

