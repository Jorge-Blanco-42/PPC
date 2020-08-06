'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String],
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);