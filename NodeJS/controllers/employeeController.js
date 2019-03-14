const express = require('express');

//To create routes for navigation
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//To import employee model here
var { Employee } = require('../models/employee');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//To Retrieve all records from emplooyees collection(in MongoDB)
//=> localhost:3000/employees/ (adding / to the base url)
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in Retriving employees: ' + JSON.stringify(err, undefined, 2));
        }
    });

});

//To Retrieve  record by giving ID from emplooyees collection(in MongoDB)
//=> localhost:3000/employees/id (adding /id to the base url)
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Retriving employees: ' + JSON.stringify(err, undefined, 2));
        }
    });
})

// To update a record
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }

    var emp = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        birthDay: req.body.birthDay,
        favoriteColor: req.body.favoriteColor,
        photoPath: req.body.photoPath
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2));
        }
    });


});



//To insert(Post) a record in Database (through postman google App)
router.post('/', (req, res) => {
    var emp = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        birthDay: req.body.birthDay,
        favoriteColor: req.body.favoriteColor,
        photoPath: req.body.photoPath
    });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Inserting a record' + JSON.stringify(err, undefined, 2));
        }
    });
})

//To Delete a record
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Retriving employees: ' + JSON.stringify(err, undefined, 2));
        }
    });
})


module.exports = router;