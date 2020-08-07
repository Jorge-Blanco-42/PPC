'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;
var ProductSchema = Schema({
    name: String,
    description: String,
    price: String,
    image: String
});
