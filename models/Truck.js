const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
            truckLogo:String,//img
            coverPhoto:String,
            truckName:String,
            businessDesc:String,
            truckContact:String,
            truckEmail:String,
            truckCity:String,
            truckWebsite:String,
            schedule:[{
                day: String, 
                working: Boolean, 
                opening: String, 
                closing: String
            }],
            socialMedia:
            {
                facebook:String,
                instagram:String,
                twitter:String
            },
            selectedServingCusines:Object,
            // Menu:[{
            //     id: Number,
            //     name: String,
            //     price: Number,
            //     description: String,
            //     category: String,
            // }],
            MenuID: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'},
            status:{type:String, default: "Close"},
            rating:{type:Number, default: 0},
            customerReview:Array,
          //  user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Truck', Schema);