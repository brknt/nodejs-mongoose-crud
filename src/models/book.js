const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        required:true
    }
});



//export model
module.exports = mongoose.model('Book',bookSchema);