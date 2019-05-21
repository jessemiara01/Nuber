// User.js
var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
    name: String,
    assignToPickup : Boolean
});


module.exports = mongoose.model('Customer', CustomerSchema);