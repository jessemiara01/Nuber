'use strict';


var mongoose = require('mongoose'),
  Driver = mongoose.model('Driver')

exports.list_all_drivers = function(req, res) {
  Driver.find({}, function(err, driver) {
    if (err)
      res.send(err);
    res.json(driver);
  });
};




exports.create_an_account = function(req, res) {
  var new_driver = new Driver(req.body);
  new_driver.save(function(err, driver) {
    if (err)
      res.send(err);
    res.json(driver);
  });
};


exports.find_a_driver = function(req, res) {
  Driver.findById(req.params.driverID, function(err, driver) {
    if (err)
      res.send(err);
    res.json(driver);
  });
};


exports.update_information = function(req, res) {
  Driver.findOneAndUpdate({_id: req.params.driverID}, req.body, {new: true}, function(err, driver) {
    if (err)
      res.send(err);
    res.json(driver);
  });
};


exports.delete_account = function(req, res) {


Driver.remove({
    _id: req.params.DriverId
  }, function(err, driver) {
    if (err)
      res.send(err);
    res.json({ message: 'Driver account deleted' });
  });
};