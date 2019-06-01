'use strict';
module.exports = function(app) {
  var driver = require('../controllers/driverController.js');
  var customer = require('../controllers/customerController.js');
  var admin = require('../controllers/adminController')


// driver routes
  app.route('/drivers')
  .get(driver.list_all_drivers)
  .post(driver.create_an_account);


app.route('/drivers/:driverId')
  .get(driver.find_a_driver)
  .put(driver.update_information)
  .delete(driver.delete_account);

// customer routes
  app.route('/customers')
  .get(customer.list_all_customers)
  .post(customer.create_an_account);


app.route('/customers/:customerId')
  .get(customer.find_a_customer)
  .put(customer.update_information)
  .delete(customer.delete_account);

// admin routes
  app.route('/admin')
  .get(admin.list_all_admins)
  .post(admin.create_an_account);


app.route('/admin/:adminID')
  .get(admin.find_an_admin)
  .put(admin.update_information)
  .delete(admin.delete_account);
};