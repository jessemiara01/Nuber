
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DriverSchema = new Schema({
    name: String,
    avail: Boolean,
    moreThanFour : Boolean,
    rating : Number,
    rate: Number,
    distance: String
});

module.exports = mongoose.model('Driver', DriverSchema);

