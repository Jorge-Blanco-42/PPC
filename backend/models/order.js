'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;
var OrderSchema = Schema({
    number: String,
    phoneNumber: String,
    total: String,
    date: Date
});

module.exports = mongoose.model("order", OrderSchema);

