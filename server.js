var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Driver = require('./api/models/driverModel'),//Created model loading
  Admin = require('./api/models/adminModel')
  Customer = require('./api/models/customerModel')
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
const dbURI = "mongodb+srv://user:Marissa11@cluster0-nc34i.mongodb.net/test?retryWrites=true"

const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10
  };
  
  mongoose.connect(dbURI, options).then(
    () => {
      console.log("Database connection established!");
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/appRoutes');//importing route
routes(app); //register the route



app.listen(port)

console.log('todo list RESTful API server started on: ' + port);