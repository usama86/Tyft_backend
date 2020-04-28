const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    profileName : String,
    profilePhoto: String,
    email: {
        type: String, 
        required:true,
        unique:true,
       // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, res.json({ code: 'Email Address already exist' })]
    },
    password: {type: String, required:true},
    phoneNumber:Number,
    created_at: {type: Date, default: Date.now},
    updated_at: Date,
    userType:String,
    isAdmin: {type: Boolean, default: false},
    Truck:Array
});

export const User = mongoose.model('User', Schema);