const User = require('../models/userModel');
const Truck = require('./../models/Truck');

module.exports = {
	async getSupplier(req, res) {
		try {
			console.log(req.body.id);

			const Supplier = await User.find({ _id: req.body.id });
			console.log(Supplier[0].TruckID);
			const TruckInfo = await Truck.find({ _id: Supplier[0].TruckID });
			res.json({ Supplier, TruckInfo });
		} catch (e) {
			console.log('Error getting Supplier', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async updateStatus(req, res) {
		try {
			let reqBody = req.body;
			Truck.find({ _id: reqBody._id }).exec().then(async (truck) => {
				if (truck.length < 1) {
					res.json({ code: "Truck ID doesn't exist" });
				} else {
					let updateResult = await Truck.update({ _id: reqBody._id }, { $set: { status: reqBody.status } });
					if (updateResult) {
						console.log(updateResult);
						res.json({ code: 'ABT0000' });
					} else {
						res.json({ code: 'ABT0001' });
					}
				}
			});
		} catch (e) {
			console.log('error updating Status', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async getSchedule(req, res) {
		//return the schedule of specific user, need to send truck id
		try {
			const TruckInfo = await Truck.find({ _id: req.body._id });
			const ScheduleData = TruckInfo;
			res.json({ ScheduleData });
		} catch (e) {
			console.log('Error getting Schedule', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async updateSchedule(req, res) {
		// _id of truck and schedule object to update
		try {
			let reqBody = req.body;
			Truck.find({ _id: reqBody._id }).exec().then(async (truck) => {
				if (truck.length < 1) {
					res.json({ code: "Truck ID doesn't exist" });
				} else {
					let updateResult = await Truck.update(
						{ _id: reqBody._id },
						{ $set: { schedule: reqBody.schedule } }
					);
					if (updateResult) {
						console.log(updateResult);
						res.json({ code: 'ABT0000' });
					} else {
						res.json({ code: 'ABT0001' });
					}
				}
			});
		} catch (e) {
			console.log('error updating Schedule', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async getCustomerReview(req, res) {
		//return the schedule of specific user, need to send truck id
		try {
			const TruckInfo = await Truck.find({ _id: req.body._id });
			const Review = TruckInfo.customerReview;
			res.json({ code: 'ABT0000', Review });
		} catch (e) {
			console.log('Error getting Schedule', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async getAllTruck(req, res) {
		try {
			const TruckInfo = await Truck.find({});
			console.log(TruckInfo);
			res.json({ TruckInfo });
		} catch (e) {
			console.log("Error retriving Truck's");
			res.json({ code: 'ABT0001' });
		}
	},
	async getAllLocation(req, res) {
		try {
			const TruckInfo = await Truck.find({}, 'truckName longitude latitude schedule');
			res.json({ TruckInfo });
		} catch (e) {
			console.log("Error retriving Truck's Location", e);
			res.json({ code: 'ABT0001' });
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
				res.json({ code: 'ABT0000' });
			} else {
				res.json({ code: 'ABT0001' });
			}
		} catch (e) {
			console.log("Error retriving Truck's Location", e);
			res.json({ code: 'ABT0001' });
		}
	},
	async setFavorite(req, res) {
		// send UserID and TruckID
		try {
			const UserInfo = await User.find({ _id: req.body.UserID }); // send user ID
			const reqBody = req.body;
			let Favorite = [];
			if (UserInfo[0].favoriteTruck) Favorite = [ ...UserInfo[0].favoriteTruck ];
			let updateResult;
			if (reqBody.selected === true) {
				Favorite.push(reqBody.TruckID);
				updateResult = await User.update({ _id: reqBody.UserID }, { $set: { favoriteTruck: Favorite } });
			} else {
				let filteredData = Favorite.filter((result) => result !== reqBody.TruckID);
				updateResult = await User.update({ _id: reqBody.UserID }, { $set: { favoriteTruck: filteredData } });
			}
			if (updateResult) {
				res.json({ code: 'ABT0000' });
			} else {
				res.json({ code: 'ABT0001' });
			}
		} catch (e) {
			console.log('Error getting Favorite Supplier', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async getFavoriteTruck(req, res) {
		try {
			const UserInfo = await User.find({ _id: req.body._id }); // send user ID
			const Favorite = UserInfo[0].favoriteTruck;
			let records = await Truck.find().where('_id').in(Favorite).exec();
			res.json({ records });
		} catch (e) {
			console.log('Error getting Favorite Supplier', e);
			res.json({ code: 'ABT0001' });
		}
  },
  async getFavorite(req, res)
  {
    try {
			const UserInfo = await User.find({ _id: req.body._id }); // send user ID
			const Favorite = UserInfo[0].favoriteTruck;
      let records = await Truck.find().where('_id').in(Favorite).exec();
      console.log(records.length)
      if(records.length>0)
        res.json({ code: 'ABT0000' });
      else 
      res.json({ code: 'ABT0001' });
			
		} catch (e) {
			console.log('Error getting Favorite Supplier', e);
			res.json({ code: 'ABT0001' });
		}
  },
  async addReview(req,res)
  {
    // console.log(review);
    // console.log(names);
    // console.log(rating)
    // console.log(route.params.ID)
    // console.log(userID)
    try {
      let reqBody = req.body;
    //  console.log( reqBody._id);
   //   console.log( reqBody.Menu)
      Truck.find({ _id: reqBody._id })
        .exec()
        .then(async (Truck) => {
          if (Truck.length < 1) {
            res.json({ code: "Truck ID doesn't exist" });
          } else {
            let updateResult;
            console.log(Truck[0].customerReview);
            Truck[0].updateOne({_id: reqBody._id}, {$set: {customerReview:  reqBody.customerReview}}, function (err, raw) {
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
  }
};
