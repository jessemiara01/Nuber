var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Admin', AdminSchema);