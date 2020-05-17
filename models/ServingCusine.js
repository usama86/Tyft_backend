const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    cusine:[
        {
            cusineName:String,
            checked:{type:Boolean, default:false}
        }
    ]
});

module.exports = mongoose.model('ServingCusine', Schema);