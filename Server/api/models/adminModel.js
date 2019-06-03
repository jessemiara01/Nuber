var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    _id: Number,
    name: String
});

module.exports = mongoose.model('Admin', AdminSchema);