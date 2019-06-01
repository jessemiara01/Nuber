'use strict';


var mongoose = require('mongoose'),
  Admin = mongoose.model('Admin')

exports.list_all_admins = function(req, res) {
  Admin.find({}, function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};




exports.create_an_account = function(req, res) {
  var new_admin = new Admin(req.body);
  new_admin.save(function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};


exports.find_an_admin = function(req, res) {
  Admin.findById(req.params.adminID, function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};


exports.update_information = function(req, res) {
  Admin.findOneAndUpdate({_id: req.params.adminID}, req.body, {new: true}, function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};


exports.delete_account = function(req, res) {


Admin.remove({
    _id: req.params.AdminId
  }, function(err, admin) {
    if (err)
      res.send(err);
    res.json({ message: 'Admin account deleted' });
  });
};