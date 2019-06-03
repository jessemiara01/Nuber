// User.js
var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    wantPickup: String,
    rating: Number
});


module.exports = mongoose.model('Customer', CustomerSchema);