'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

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
