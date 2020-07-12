const User = require('../models/userModel');
const Truck = require('./../models/Truck')
const Menu = require('./../models/Menu')
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
module.exports = {
  async getAllUser(req, res) {
    try {
      const Users = await User.find();
      res.send(Users);
    } catch (e) {
      console.log("error getting forum posts", e);
      res.json({ code: "ABT0001" });
    }
  },
  async getUser(req, res) {
    try {
      const Users = await User.find({email:req.body.email});
      res.send(Users);
    } catch (e) {
      console.log("error getting forum posts", e);
      res.json({ code: "ABT0001" });
    }
  },
  async signup(req, res) {
    try {
      //   console.log(req.files[0].path);
      //  console.log(req.body.email)
      //  c/onsole.log(req.body)


      let data = req.body
      //  console.log(data)
      User.find({ email: data.email })
        .exec()
        .then(async (user) => {
                console.log(req.body)
          if (user.length >= 1) {
            console.log(user);
            //   console.log(user.length);
            // console.log(user.email);
            res.json({ code: "Email Address already exist" });
          } else {
            //  console.log(req.files)
            // console.log(req.files[0].path)
            // console.log(req.files[1].path)
            // console.log(req.files[2].path)
          
            // console.log(data);
            var hashedPassword = bcrypt.hashSync(data.password, 10);
            let userData;
            let truckData;
            let  MenuData;
            if (data.userType === "Supplier") {

              MenuData= {
                Menu : data.Menu
              }
              const saveData = new Menu(MenuData);
              var menData = await saveData.save();

              truckData = {
                truckLogo: data.truckLogo, //string
                coverPhoto: data.coverPhoto, //string
                truckName: data.truckName,
                businessDesc: data.businessDesc,
                truckContact: data.truckContact,
                truckEmail: data.truckEmail,
                truckCity: data.truckCity,
                truckWebsite: data.truckWebsite,
                schedule: data.schedule,
                socialMedia: {
                  facebook: data.facebook,
                  instagram: data.instagram,
                  twitter: data.twitter,
                },
                selectedServingCusines: data.selectedServingCusines,
                MenuID: menData._id,
              };
              console.log(truckData);
              
              const TruckDatas = new Truck(truckData);
              var Rdata = await TruckDatas.save();
              console.log(Rdata);
              console.log(Rdata._id);
              userData = {
                email: data.email,
                password: hashedPassword,
                profileName: data.profileName,
                // profilePhoto: req.files[2].path, //img
                phoneNumber: data.phoneNumber,
                userType: data.userType,
                TruckID: Rdata._id,
              };
          //    console.log(userData);
              const userDatas = new User(userData);
              await userDatas.save();

              res.json({ code: "ABT0000" });
            } else if (data.userType === "Customer") {
              console.log('USER',data)
              let social;
              if(!data.social)
                  social = false;
              else
                  social = data.social;  
              userData = {
                email: data.email,
                password: hashedPassword,
                profileName: data.profileName,
                // profilePhoto: req.files[0].path,
                phoneNumber: data.phoneNumber,
                userType: data.userType,
                Language: data.Language,
                social:social
              };
              console.log(userData);
              const userDatas = new User(userData);
              await userDatas.save();
              res.json({ code: "ABT0000" });
            } else {
            }
          }
        })
        
      // let reqBody = req.body;
    } catch (e) {
      console.log(e);
      res.json({ code: "ABT0001"});
    }
  },

  async login(req, res) {
    try {
      console.log(req.body.email);
      console.log(req.body.password)
      
      User.find({ email: req.body.email })
        .exec()
        .then(async (user) => {
          if (user.length < 1) {
            console.log("HI")
            res.json({ code: "Email Address already exist" });
          }
          console.log(user.length);
          console.log(user[0])
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              res.json({ message: "password failed" });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id,
                  userName: user[0].profileName,
                  userType: user[0].userType,
                  profileName: user[0].profileName,
                  phoneNumber:user[0].phoneNumber

                  
                },
                "Bearer" //process.env.xyz
                // {
                // 	expiresIn: "1h"
                // },
              );
              return res.json({ message: "Auth Successful", token: token });
            } else {
              return res.json({ message: "Auth Failed" });
            }
          });
        });
      // let reqBody = req.body;
    } catch (e) {
      console.log("error creating New user", e);
      res.json({ code: "ABT0001" });
    }
  },
  async updateUser(req, res) {
    try {
      let data = req.body;
      var hashedPassword = bcrypt.hashSync(data.password, 10);
      User.find({ _id: data._id })
        .exec()
        .then(async (truck) => {
          if (truck.length < 1) {
            res.json({ code: "Truck ID doesn't exist" });
          } else {
            let updateResult = await User.update(
              { _id: data._id },
              { $set: { 
                email: data.email,
                password: hashedPassword,
                profileName: data.profileName,
                // profilePhoto: req.files[0].path,
                phoneNumber: data.phoneNumber,
                // userType: data.userType,
                Language: data.Language,
              
              } }
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
      console.log("error updating User", e);
      res.json({ code: "ABT0001" });
    }
  },



  
};
