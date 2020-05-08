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

};
