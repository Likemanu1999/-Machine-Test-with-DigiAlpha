const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        trim:true
    },
    lastname:{
        type:String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
});
module.exports = mongoose.model('users', UserSchema)