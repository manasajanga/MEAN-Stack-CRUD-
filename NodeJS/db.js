const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


//DataBase connection @ mongodb://localhost:27017/CrudDB
mongoose.connect('mongodb://localhost:27017/CrudDB',{ useNewUrlParser: true } , (err)=> {
    if(!err){
        console.log('MongoDB  Connection succeeded');
    }
    else{
        console.log('Error in DB connection' + JSON.stringify(err, undefined, 2));
    }
});

//To export this module
module.exports = mongoose;