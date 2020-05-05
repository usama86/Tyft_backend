import { User } from "../models/userModel";
import { Truck } from "./../models/Truck";
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
export default {
  async getSupplier(req, res) {
    try {
      const getSupplier = await User.find({_id:req.body.id});

      const getTruckInfo = await Truck.find({_id:getSupplier.truck});

      res.json({getSupplier,getTruckInfo});
    } catch (e) {
      console.log("error getting Supplier", e);
      res.json({ code: "ABT0001" });
    }
  },

};
