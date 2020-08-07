'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;
var RestaurantSchema = Schema({
    name: String,
    phoneNumber: String,
    email: String,
    facebook: String,
    instagram: String,
    whatsapp: String,
    address: String,
    mainLogo: String,
    contactLogo: String,
    cartLogo: String,
    workingTime: String
});
module.exports = mongoose.model('Restaurant', RestaurantSchema);