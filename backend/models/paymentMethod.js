'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


var PaymentMethodSchema = Schema({
    name: String,
    state: Boolean
});