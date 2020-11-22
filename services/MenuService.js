// import { User } from "../models/userModel";
const User =  require('../models/userModel');
const Menu =  require('./../models/Menu')
// import { Menu } from "./../models/Menu";
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    async getSupplierMenu(req, res) {   //return the Menu of specific user, need to send Menu id
        try {
           // const MenuInfo = await Menu.find({ _id: req.body._id},{"Menu.category":1}).sort( { "Menu.category": -1 });

           const MenuInfo = Menu.aggregate([
            // Initial document match (uses index, if a suitable one is available)
            { $match: {
                _id : req.body._id
            }},
        
            // Expand the scores array into a stream of documents
            { $unwind: '$Menu' },
        
            // Filter to 'homework' scores 
            // { $match: {
            //     'Menu.type': 'homework'
            // }},
        
            // Sort in descending order
            // { $sort: {
            //     'Menu.category': 1
            // }}
          ])
          console.log(MenuInfo);
          const MenuData = MenuInfo;
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
          // console.log( reqBody.Menu)
          Menu.find({ _id: reqBody._id })
            .exec()
            .then(async (Menus) => {
              if (Menus.length < 1) {
                res.json({ code: "Menu ID doesn't exist" });
              } else {
                let updateResults;
                console.log(" I am menu")
                 console.log(Menus);
                console.log(reqBody.Menu);
                 updateResults = await Menu.updateOne({_id: ObjectID(reqBody._id)}, {$set: {Menu:  reqBody.Menu}});
                  console.log('updated')                  
                 console.log(updateResults)
                if (updateResults) {
                  console.log(updateResults);
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