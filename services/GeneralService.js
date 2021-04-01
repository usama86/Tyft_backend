const General = require('../models/General');
const User = require('../models/userModel');
const Truck = require('./../models/Truck');
var ObjectID = require('mongodb').ObjectID;
const fetch = require('node-fetch');

module.exports = {
	async getRadius(req, res) {
		try {
			const Generals = await General.find();
			res.send(Generals);
		} catch (e) {
			console.log('error getting Map Radius', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async AddRadius(req, res) {
		try {
			let Radius = {
				MapRadius: 16093.4
			};
			const Radiuss = new General(Radius);
			await Radiuss.save();
			res.json({ code: 'ABT000' });
		} catch (e) {
			console.log('error saving Map Radius', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async UpdateRadius(req, res) {
		try {
			let reqBody = req.body;
			let updateResults = await General.updateOne(
				{ _id: ObjectID(reqBody[0]._id) },
				{ $set: { MapRadius: reqBody[0].MapRadius } }
			);
			if (updateResults) {
				res.json({ code: 'ABT0000' });
			} else {
				res.json({ code: 'ABT0001' });
			}
		} catch (e) {
			console.log('error updating Status', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async deleteData(req, res) {
		try {
			let reqBody = req.body;
			let updateResults;
			if (reqBody.type === 'User') {
				updateResults = await User.updateOne({ _id: ObjectID(reqBody._id) }, { $set: { isDeleted: true } });
			} else if (reqBody.type === 'Truck') {
				updateResults = await Truck.updateOne({ _id: ObjectID(reqBody._id) }, { $set: { isDeleted: true } });
			}

			if (updateResults) {
				res.json({ code: 'ABT0000' });
			} else {
				res.json({ code: 'ABT0001' });
			}
		} catch (e) {
			console.log('error updating Status', e);
			res.json({ code: 'ABT0001' });
		}
	},
	async UploadImage(req, res) {
		try {
			let reqBody = req.body;

			const file = req.file;

			var formdata = new FormData();
			formdata.append('file', {
				uri: file.uri,
				type: 'image/jpeg',
				name: val.fileName,
			  });
			formdata.append('upload_preset', 'tyftBackend');
			// var myHeaders = new Headers();
			// myHeaders.append('Content-Type', 'multipart/form-data');
			//  file.append('Accept', 'application/json');
			// file.append('upload_preset', 'tyftBackend');
			var requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
					'Accept': 'application/json',
				},
				body: formdata,
				redirect: 'follow'
			};
			fetch('https://api.cloudinary.com/v1_1/hmrzthc6f/image/upload', requestOptions)
				.then((response) => response.json())
				.then(async (result) => {
					console.log(result);
					res.json({ url: result.url });
				})
				.catch((error) => {
					console.log('error', error);
					// setIsLoading(false);
				});
		} catch (e) {
			console.log('error updating Status', e);
			res.json({ code: 'ABT0001' });
		}
	}
};
