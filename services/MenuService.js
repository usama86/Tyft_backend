// import { User } from "../models/userModel";
const User =  require('../models/userModel');
const Menu =  require('./../models/Menu')
// import { Menu } from "./../models/Menu";

module.exports = {
    async getSupplierMenu(req, res) {   //return the Menu of specific user, need to send Menu id
        try {
          const MenuInfo = await Menu.find({ _id: req.body._id });
          const MenuData = MenuInfo[0].Menu;
          res.json({ MenuData,code:'ABT0000' });
        } catch (e) {
          console.log("Error getting Menu", e);
          res.json({ code: "ABT0001" });
        }
      },
      async updateMenu(req, res) {// _id of Menu and schedule object to update
        try {
          let reqBody = req.body;
          console.log( reqBody._id);
          console.log( reqBody.Menu)
          Menu.find({ _id: reqBody._id })
            .exec()
            .then(async (Menu) => {
              if (Menu.length < 1) {
                res.json({ code: "Menu ID doesn't exist" });
              } else {
                let updateResult;
                Menu.updateOne({_id: reqBody._id}, {$set: {Menu:  reqBody.Menu}}, function (err, raw) {
                  if(err)
                  {
                    console.log('err  is ',err)
                    res.send("ERROR")
                  }
                  updateResult=raw;  
                   
                })
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
          const MenuInfo = await Menu.find();
          res.json({ code:"ABT0000", MenuInfo });
        } catch (e) {
          console.log("Error getting Menu", e);
          res.json({ code: "ABT0001" });
        }
      },

}