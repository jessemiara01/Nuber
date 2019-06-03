
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DriverSchema = new Schema({
    _id: Number,
    name: String,
    avail: String,
    rating: Number,
});

module.exports = mongoose.model('Driver', DriverSchema);

