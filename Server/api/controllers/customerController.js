'use strict';


var mongoose = require('mongoose'),
  Customer = mongoose.model('Customer')

exports.list_all_customers = function(req, res) {
  Customer.find({}, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};




exports.create_an_account = function(req, res) {
  var new_customer = new Customer(req.body);
  new_customer.save(function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};


exports.find_a_customer = function(req, res) {
  Customer.findById(req.params.customerID, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};


exports.update_information = function(req, res) {
  Customer.findOneAndUpdate({_id: req.params.customerID}, req.body, {new: true}, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};


exports.delete_account = function(req, res) {


Customer.remove({
    _id: req.params.CustomerId
  }, function(err, customer) {
    if (err)
      res.send(err);
    res.json({ message: 'Customer account deleted' });
  });
};