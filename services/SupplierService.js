import { User } from "../models/userModel";
import { Truck } from "./../models/Truck";
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
export default {
  async getSupplier(req, res) {
    try {
       console.log(req.body.id);
      
      const Supplier = await User.find({ _id: req.body.id });
      const TruckInfo = await Truck.find({ _id: Supplier[0].truck });
      res.json({ Supplier, TruckInfo });
    } catch (e) {
      console.log("Error getting Supplier", e);
      res.json({ code: "ABT0001" });
    }
  },
  async updateStatus(req, res) {
    try {
      let reqBody = req.body;
      Truck.find({ _id: reqBody._id })
        .exec()
        .then(async (truck) => {
          if (truck.length < 1) {
            res.json({ code: "Truck ID doesn't exist" });
          } else {
            let updateResult = await Truck.update(
              { _id: reqBody._id },
              { $set: { status: reqBody.status } }
            );
            if (updateResult) {
              console.log(updateResult);
              res.json({ code: "ABT0000" });
            } else {
              res.json({ code: "ABT0001" });
            }
          }
        });
    } catch (e) {
      console.log("error updating Status", e);
      res.json({ code: "ABT0001" });
    }
  },
  async getSchedule(req, res) {   //return the schedule of specific user, need to send truck id
    try {
      const TruckInfo = await Truck.find({ _id: req.body._id });
      const ScheduleData = TruckInfo.schedule;
      res.json({ code:"ABT0000", ScheduleData });
    } catch (e) {
      console.log("Error getting Schedule", e);
      res.json({ code: "ABT0001" });
    }
  },
  async updateSchedule(req, res) {// _id of truck and schedule object to update
    try {
      let reqBody = req.body;
      Truck.find({ _id: reqBody._id })
        .exec()
        .then(async (truck) => {
          if (truck.length < 1) {
            res.json({ code: "Truck ID doesn't exist" });
          } else {
            let updateResult = await Truck.update(
              { _id: reqBody._id },
              { $set: { schedule: reqBody.schedule } }
            );
            if (updateResult) {
              console.log(updateResult);
              res.json({ code: "ABT0000" });
            } else {
              res.json({ code: "ABT0001" });
            }
          }
        });
    } catch (e) {
      console.log("error updating Schedule", e);
      res.json({ code: "ABT0001" });
    }
  },
  async getCustomerReview(req, res) {   //return the schedule of specific user, need to send truck id
    try {
      const TruckInfo = await Truck.find({ _id: req.body._id });
      const Review = TruckInfo.customerReview;
      res.json({ code:"ABT0000", Review });
    } catch (e) {
      console.log("Error getting Schedule", e);
      res.json({ code: "ABT0001" });
    }
  },
  async getAllTruck(req,res)
  {
    try{
      const TruckInfo = await Truck.find();
      res.json({  TruckInfo });
    }catch (e) {
      console.log("Error retriving Truck's");
      res.json({ code: "ABT0001" });
    }
  },
  async getFavoriteTruck(req,res)
  {
    try {  
     const UserInfo = await User.find({ _id: req.body._id});  // send user ID

     const Favorite  = UserInfo.favoriteTruck;
     
     let records = await Truck.find().where('_id').in(Favorite).exec();

     
     res.json({ records });
   } catch (e) {
     console.log("Error getting Favorite Supplier", e);
     res.json({ code: "ABT0001" });
   }
  
  }
  
  
};
