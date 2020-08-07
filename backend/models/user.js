'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var UserSchema = Schema({
    name: String,
    password: String,
    email: String,
    phoneNumber: String,
    address: String,
    role: String,
    orders: []
});