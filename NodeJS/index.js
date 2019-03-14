const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// To import MongoDB connection file
const { mongoose } = require('./db.js');
// To import controller file
var employeeController = require('./controllers/employeeController.js')

//Middle Ware Execution 
var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors({ origin: 'http://localhost:4200' }));// we can make a request from Angular app

//To connect express server @ port 3000
app.listen(3000, ()=> console.log('Server started at port : 3000')); 
//Assigning employyes collection to the route ==>localhost:3000/employees(base url)
app.use('/employees', employeeController);   