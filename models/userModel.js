const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    profileName : String,
    profilePhoto: String,
    email: {
        type: String, 
      //  required:[true,"Email can not be empty"]
        unique:true,
       // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, res.json({ code: 'Email Address already exist' })]
    },
    password: {type: String, required:true},
    phoneNumber:String,
    created_at: {type: Date, default: Date.now},
    updated_at: Date,
    userType:String,
    isAdmin: {type: Boolean, default: false},
    TruckID:{type: mongoose.Schema.Types.ObjectId, ref: 'Truck'},
    Language: String,
    selectedServingCusines: Array,
    favoriteTruck: Array
});

export const User = mongoose.model('User', Schema);