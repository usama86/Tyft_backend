import { User } from "../models/userModel";
import { Truck } from "./../models/Truck";
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
export default {
  async getAllUser(req, res) {
    try {
      const Users = await User.find();
      res.send(Users);
    } catch (e) {
      console.log("error getting forum posts", e);
      res.json({ code: "ABT0001" });
    }
  },
  async signup(req, res) {
    try {
	//   console.log(req.files[0].path);
	 // console.log(req.body.email)
      User.find({ email: req.body.email })
        .exec()
        .then(async (user) => {
          if (user.length >= 1) {
			//   console.log(user.length);
			// console.log(user.email);	
            res.json({ code: "Email Address already exist" });
          } else {
			console.log(req.files)
			console.log(req.files[0].path)
			console.log(req.files[1].path)
			console.log(req.files[2].path)
            let data = req.body;
            var hashedPassword = bcrypt.hashSync(data.password, 10);
			let userData;
			let truckData;
            if (data.userType === "Supplier") {
              truckData = {
                truckLogo: req.files[0].path, //img
                coverPhoto: req.files[1].path, //img
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
                Menu: data.Menu,
			  };
			  console.log(truckData);
              const TruckDatas = new Truck(truckData);
              var Rdata = await TruckDatas.save();
              userData = {
                email: data.email,
                password: hashedPassword,
                profileName: data.profileName,
                profilePhoto: req.files[2].path, //img
                phoneNumber: data.phoneNumber,
                userType: data.userType,
                truck: Rdata._id,
              };
			  console.log(userData);
              const userDatas = new User(userData);
              await userDatas.save();

              res.json({ code: "ABT0000" });
            } else if (data.userType === "Customer") {
              userData = {
                email: data.email,
                password: hashedPassword,
                profileName: data.profileName,
                profilePhoto: req.files[0].path,
                phoneNumber: data.phoneNumber,
                userType: data.userType,
                Language: data.Language,
			  };
			  console.log(userData)
            //   const userDatas = new User(userData);
            //   await userDatas.save();
              res.json({ code: "ABT0000" });
            } else {
            }
          }
        });
      // let reqBody = req.body;
    } catch (e) {
      res.json({ code: "ABT0001" });
    }
  },

  async login(req, res) {
    try {
      User.find({ email: req.body.email })
        .exec()
        .then(async (user) => {
          if (user.length < 1) {
            res.json({ code: "Email Address doesn't already exist" });
          }
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              res.json({ message: "password failed" });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id,
                  userType: user[0].userType,
                  profileName: user[0].profileName,
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
};
