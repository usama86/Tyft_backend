import { User } from "../models/userModel";
import { Truck } from "./../models/Truck";
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
export default {
  async getSupplier(req, res) {
    try {
      // console.log(req.body.id);
      const Supplier = await User.find({_id:req.body.id});
      const TruckInfo = await Truck.find({_id:Supplier[0].truck});
      res.json({Supplier,TruckInfo})
    } catch (e) {
      console.log("Error getting Supplier", e);
      res.json({ code: "ABT0001" });
    }
  },
  async updateStatus(req, res) {
    try {
        let reqBody = req.body;
        console.log('body => ', reqBody);

        Truck.find({ _id:reqBody._id })
        .exec()
        .then(async (truck) => {
          if (truck.length < 1) {
            //   console.log(user.length);
            // console.log(user.email);
            res.json({ code: "Truck ID doesn't exist" });
          }
          
          let updateResult = await Truck.update({_id : reqBody._id}, { $set: {approved: reqBody.status}});
          if(updateResult) {
              console.log(updateResult);
              res.json({code : "ABT0000"});
          } else {
              res.json({code : "ABT0001"});
          }
        
        })
        
    } catch (e) {
        console.log('error updating Status', e);
        res.json({code : "ABT0001"});
    }
  },

};
