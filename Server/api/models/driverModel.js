
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DriverSchema = new Schema({
    name: String,
    avail: String,
    rating: String,
});

module.exports = mongoose.model('Driver', DriverSchema);

