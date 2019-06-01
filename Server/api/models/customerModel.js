// User.js
var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
    name: String,
    wantPickup: String,
    rating: Number
});


module.exports = mongoose.model('Customer', CustomerSchema);