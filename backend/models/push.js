'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


var Schema = mongoose.Schema;
var pushSchema = Schema({
    subscriber: String

});

module.exports = mongoose.model("Push", pushSchema);

