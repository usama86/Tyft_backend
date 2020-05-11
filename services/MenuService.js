import { User } from "../models/userModel";
import { Menu } from "./../models/Menu";
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
export default {
    async getSupplierMenu(req, res) {   //return the schedule of specific user, need to send Menu id
        try {
          const MenuInfo = await Menu.find({ _id: req.body._id });
          const MenuData = MenuInfo.Menu;
          res.json({ code:"ABT0000", MenuData });
        } catch (e) {
          console.log("Error getting Menu", e);
          res.json({ code: "ABT0001" });
        }
      },
      async updateMenu(req, res) {// _id of Menu and schedule object to update
        try {
          let reqBody = req.body;
          Menu.find({ _id: reqBody._id })
            .exec()
            .then(async (Menu) => {
              if (Menu.length < 1) {
                res.json({ code: "Menu ID doesn't exist" });
              } else {
                let updateResult = await Menu.update(
                  { _id: reqBody._id },
                  { $set: { Menu: reqBody.Menu } }
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
          console.log("error updating Menu", e);
          res.json({ code: "ABT0001" });
        }
      },
      async getAllMenu(req, res) {   //return the schedule of specific user, need to send Menu id
        try {
          const MenuInfo = await Menu.find({});
          res.json({ code:"ABT0000", MenuInfo });
        } catch (e) {
          console.log("Error getting Menu", e);
          res.json({ code: "ABT0001" });
        }
      },

}