'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    password: String,
    email: String,
    phoneNumber: String,
    address: String,
    role: String,
    orders: []
});

module.exports = mongoose.model("user", UserSchema);