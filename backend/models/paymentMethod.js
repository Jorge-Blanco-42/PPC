'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;

var PaymentMethodSchema = Schema({
    name: String,
    state: Boolean
});

module.exports = mongoose.model("paymentmethod", PaymentMethodSchema);


