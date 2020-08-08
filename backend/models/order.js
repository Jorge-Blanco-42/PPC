'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


var Schema = mongoose.Schema;
var OrderSchema = Schema({
    number: String,
    total: String,
    date: String
});

module.exports = mongoose.model("order", OrderSchema);

