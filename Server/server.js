
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./api/models/driverModel');
const Driver = require('./api/models/driverModel');
const Customer = require('./api/models/customerModel');
const Admin = require('./api/models/adminModel');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
"mongodb+srv://user:Marissa11@cluster0-nc34i.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
var ObjectId = mongoose.Types.ObjectId;

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//GET method for drivers
router.get('/getDrivers', (req, res) => {
  Driver.find((err, driver) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({driver: driver });
  });
});

//GET method for users
router.get('/getCustomers', (req, res) => {
  Customer.find((err, customer) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({customer: customer });
  });
});


//GET method for admins
router.get('/getAdmins', (req, res) => {
  Admin.find((err, admin) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({admin: admin });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteDriver', (req, res) => {

    Driver.findByIdAndDelete(req.body.id, (err) => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
});

router.delete('/deleteCustomer', (req, res) => {

  Customer.findByIdAndDelete(req.body.id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteAdmin', (req, res) => {

  Admin.findByIdAndDelete(req.body.id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});



// this is our create method
// this method adds new data in our database
router.post('/putAdmin', (req, res) => {
  let admin = new Admin();

  const {_id, name} = req.body;

  if ((!_id && _id !== 0) || !name) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',

    });
  }
  admin._id = _id;
  admin.name = name;

  admin.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putCustomer', (req, res) => {
  let customer = new Customer();


  const {_id, name, wantPickup, rating} = req.body;

  if ((!_id && _id !== 0) || !name) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',

    });
  }
  customer._id = _id;
  customer.name = name;
  customer.wantPickup = wantPickup;
  customer.rating = rating;

  customer.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
router.post('/putDriver', (req, res) => {
  let driver = new Driver();

  const {_id, name, avail, rating} = req.body;

  if ((!_id && _id !== 0) || !name) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',

    });
  }
  driver._id = _id;
  driver.name = name;
  driver.avail = avail;
  driver.rating = rating;

  driver.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
