const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
            truckLogo:String,//img
            truckName:String,
            businessDesc:String,
            truckContact:String,
            truckEmail:String,
            truckCity:String,
            truckWebsite:String,
            schedule:Array,
            socialMedia:[
            {
                facebook:String,
                instagram:String,
                twitter:String
            }
            ],
            selectedServingCusines:Array,
            Menu:Array,
            status:{type:String, default: "Close"},
            rating:{type:Number, default: 0},
            customerReview:Array,
          //  user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

export const Truck = mongoose.model('Truck', Schema);