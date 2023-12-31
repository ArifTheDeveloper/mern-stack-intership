const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new  mongoose.Schema({
    fname : {
        type : String,
        required : true,
        trime : true
    },
    lname : {
        type : String,
        required : true,
        trime : true
    },
    email : {
        type : String,
        required : true,
        trime : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("not valid email")
            }
        }
    },
    mobile : {
        type : String,
        required : true,
        unique : true,
        minlenght : 10,
        maxlength : 10
    },
    gender : {
         type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    datacreated : Date,
    dateUpdated : Date

});

const users = new mongoose.model('users',userSchema);

module.exports = users;