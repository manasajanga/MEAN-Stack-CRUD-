const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    email: { type: String },
    phoneNumber: { type: Number },
    birthDay: { type: Date },
    favoriteColor: { type: String },
    photoPath: { type: String }
});

module.exports = { Employee };