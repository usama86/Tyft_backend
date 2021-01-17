const User = require("../models/userModel");
const Truck = require("./../models/Truck");
var ObjectID = require('mongodb').ObjectID;
module.exports = {
  async getSupplier(req, res) {
    try {
      console.log(req.body.id);

      const Supplier = await User.find({ _id: req.body.id });
      console.log(Supplier[0].TruckID);
      const TruckInfo = await Truck.find({ _id: Supplier[0].TruckID });
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
  async getSchedule(req, res) {
    //return the schedule of specific user, need to send truck id
    try {
      const TruckInfo = await Truck.find({ _id: req.body._id });
      const ScheduleData = TruckInfo;
      res.json({ ScheduleData });
    } catch (e) {
      console.log("Error getting Schedule", e);
      res.json({ code: "ABT0001" });
    }
  },
  async updateSchedule(req, res) {
    // _id of truck and schedule object to update
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
  async getCustomerReview(req, res) {
    //return the schedule of specific user, need to send truck id
    try {
	  const TruckInfo = await Truck.find({ _id: req.body._id });
	  
	  const Review = TruckInfo[0].customerReview;
	  console.log('here in rev',Review)
      res.json({Review });
    } catch (e) {
      console.log("Error getting Schedule", e);
      res.json({ code: "ABT0001" });
    }
  },
  async getAllTruck(req, res) {
    try {
      const TruckInfo = await Truck.find({});
      console.log(TruckInfo);
      res.json({ TruckInfo });
    } catch (e) {
      console.log("Error retriving Truck's");
      res.json({ code: "ABT0001" });
    }
  },
  async getAllLocation(req, res) {
    try {
      const TruckInfo = await Truck.find(
        {},
        "truckName longitude latitude schedule"
      );
      res.json({ TruckInfo });
    } catch (e) {
      console.log("Error retriving Truck's Location", e);
      res.json({ code: "ABT0001" });
    }
  },
  async setLocation(req, res) {
    // send TruckID longitude latitude
    try {
      let updateResult = await Truck.update(
        { _id: req.body.TruckID },
        { $set: { longitude: req.body.longitude, latitude: req.body.latitude } }
      );
      if (updateResult) {
        console.log(updateResult);
        res.json({ code: "ABT0000" });
      } else {
        res.json({ code: "ABT0001" });
      }
    } catch (e) {
      console.log("Error retriving Truck's Location", e);
      res.json({ code: "ABT0001" });
    }
  },
  async setFavorite(req, res) {
    // send UserID and TruckID
    try {
      const UserInfo = await User.find({ _id: req.body.UserID }); // send user ID
      const reqBody = req.body;
      let Favorite = [];
      if (UserInfo[0].favoriteTruck) Favorite = [...UserInfo[0].favoriteTruck];
      let updateResult;
      if (reqBody.selected === true) {
        Favorite.push(reqBody.TruckID);
        updateResult = await User.update(
          { _id: reqBody.UserID },
          { $set: { favoriteTruck: Favorite } }
        );
      } else {
        let filteredData = Favorite.filter(
          (result) => result !== reqBody.TruckID
        );
        updateResult = await User.update(
          { _id: reqBody.UserID },
          { $set: { favoriteTruck: filteredData } }
        );
      }
      if (updateResult) {
        res.json({ code: "ABT0000" });
      } else {
        res.json({ code: "ABT0001" });
      }
    } catch (e) {
      console.log("Error getting Favorite Supplier", e);
      res.json({ code: "ABT0001" });
    }
  },
  async getFavoriteTruck(req, res) {
    try {
      const UserInfo = await User.find({ _id: req.body._id }); // send user ID
      const Favorite = UserInfo[0].favoriteTruck;
      let records = await Truck.find().where("_id").in(Favorite).exec();
      res.json({ records });
    } catch (e) {
      console.log("Error getting Favorite Supplier", e);
      res.json({ code: "ABT0001" });
    }
  },
  async getFavorite(req, res) {
    try {
      const UserInfo = await User.find({ _id: req.body._id }); // send user ID
      const Favorite = UserInfo[0].favoriteTruck;
      let records = await Truck.find().where("_id").in(Favorite).exec();
      console.log(records)
      console.log(records.length);
      if (records.length > 0) res.json({ code: "ABT0000" });
      else res.json({ code: "ABT0001" });
    } catch (e) {
      console.log("Error getting Favorite Supplier", e);
      res.json({ code: "ABT0001" });
    }
  },
  async addReview(req, res) {
    try {
      const truckInfo = await Truck.find({ _id: req.body.TruckID }); // send user ID
      const reqBody = req.body;
      let review = [];
      if (truckInfo[0].customerReview) {
        review.push(...truckInfo[0].customerReview, { ...reqBody.Review });
      } else {
        review.push({ ...reqBody.Review });
        console.log("Else", review);
      }
      let response = await Truck.update(
        { _id: reqBody.TruckID },
        { $set: { customerReview: review } }
      );
      if (response) {
        res.json({ code: "ABT0000" });
      } else {
        res.json({ code: "ABT0001" });
      }
    } catch (e) {
      console.log("Error getting Reviews", e);
      res.json({ code: "ABT0001" });
    }
  },
  async updateTruckLogo(req, res) {
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
              { $set: { truckLogo: reqBody.imgUrl } }
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
  async updateCoverImage(req, res) {
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
              { $set: { coverPhoto: reqBody.imgUrl } }
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
  async getSocialMedia(req, res) {
    try {
      const TruckInfo = await Truck.find({ _id: req.body._id });
      
      const SocialMedia = TruckInfo[0].socialMedia;
      console.log('here in SocialMedia',SocialMedia)
        res.send(SocialMedia);
      } catch (e) {
        console.log("Error getting Schedule", e);
        res.json({ code: "ABT0001" });
      }
    },
    async updateSocialMedia(req, res) {
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
                { $set: { socialMedia: reqBody.socialMedia } }
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
    
    async getServingCusine(req, res) {
      try {
        const TruckInfo = await Truck.find({ _id: req.body._id });
        
        const selectedServingCusines = TruckInfo[0].selectedServingCusines;
        console.log('here in selectedServingCusines',selectedServingCusines)
          res.send(selectedServingCusines);
        } catch (e) {
          console.log("Error getting selectedServingCusines", e);
          res.json({ code: "ABT0001" });
        }
    },
    async updateServingCusine(req, res) {
      try {
        let reqBody = req.body;
        Truck.find({ _id: reqBody._id })
          .exec()
          .then(async (truck) => {
            if (truck.length < 1) {
              res.json({ code: "Truck ID doesn't exist" });
            } else {
              console.log(truck)
              console.log(reqBody.selectedServingCusines);
              // let updateResult = await Truck.update(
              //   { _id: reqBody._id },
              //   { $set: { selectedServingCusines: reqBody.selectedServingCusines } }
              // );
              let updateResult = await Truck.updateOne({_id: ObjectID(reqBody._id)}, {$set: {selectedServingCusines:  reqBody.selectedServingCusines}});
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
    async updateTruckInfo(req, res) {
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
                { $set: 
                  { 
                  truckName:reqBody.truckName,
                  businessDesc:reqBody.businessDesc,
                  truckContact:reqBody.truckContact,
                  truckEmail:reqBody.truckEmail,
                  truckCity:reqBody.truckCity,
                  truckWebsite:reqBody.truckWebsite
                  } 
                }
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
    async updateTruck(req, res) {
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
                { $set: 
                  { 
                  truckName:reqBody.truckName,
                  businessDesc:reqBody.businessDesc,
                  truckContact:reqBody.truckContact,
                  truckEmail:reqBody.truckEmail,
                  truckCity:reqBody.truckCity,
                  truckWebsite:reqBody.truckWebsite,
                  socialMedia:reqBody.socialMedia,
                  status:reqBody.status,
                  Active:reqBody.Active
                  } 
                }
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
    async getCategory(req, res) {   //return the Category of specific user, need to send truck id
      try {
          const TruckInfo = await Truck.find({ _id: req.body._id });
          const category = TruckInfo[0].categoryArray;
          console.log('here in category',category)
          res.send(category);
        } catch (e) {
          console.log("Error getting Category", e);
          res.json({ code: "ABT0001" });
        }
    },
    async updateCategory(req, res) {// _id of Truck
      try {
        let reqBody = req.body;
        console.log( reqBody._id);
        console.log(reqBody.categoryArrays);
        // console.log( reqBody.Menu)
        Truck.find({ _id: reqBody._id })
          .exec()
          .then(async (Trucks) => {
            if (Trucks.length < 1) {
              res.json({ code: "Truck ID doesn't exist" });
            } else {
              let updateResults;
               updateResults = await Truck.updateOne({_id: reqBody._id}, {$set: {categoryArray:  reqBody.categoryArrays}});         
              if (updateResults) {
                res.json({ code: "ABT0000" });
              } else {
                res.json({ code: "ABT0001" });
              }
            }
          });
      } catch (e) {
        console.log("error updating Truck Category", e);
        res.json({ code: "ABT0001" });
      }
    },
};
