const General = require('../models/General');
const User = require('../models/userModel');
const Truck = require('./../models/Truck');
var ObjectID = require('mongodb').ObjectID;
const fetch = require('node-fetch');
const formData = require("express-form-data");
var cloudinary = require('cloudinary').v2;
const Datauri = require('datauri');
const path = require('path');
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
			const dUri = new Datauri();
			const paths= dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
			const file = req.file;
			console.log(reqBody)
			cloudinary.config({ 
				cloud_name: 'hmrzthc6f', 
				api_key: '416752196531331', 
				api_secret: 'Sckg2t-RYRxxu1JgY_KWP7FDLak' 
			  });
			cloudinary.uploader.upload(paths, function(error, result) {
				console.log("I am result -> ", dUri.format)
				console.log("ERROR", error)
				res.json({ code:"ABT0000",url: result.url });
			});
			// console.log(file);
			// formData.append('file', {
			// 	uri: __dirname + './../uploads/' + file.originalname,
			// 	type: 'image/jpeg',
			// 	name: file.fileName,
			//   });
			// formData.append('upload_preset', 'tyftBackend');
			// // var myHeaders = new Headers();
			// // myHeaders.append('Content-Type', 'multipart/form-data');
			// //  file.append('Accept', 'application/json');
			// // file.append('upload_preset', 'tyftBackend');
			// var requestOptions = {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'multipart/form-data',
			// 		'Accept': 'application/json',
			// 	},
			// 	body: formData,
			// 	redirect: 'follow'
			// };
			// fetch('https://api.cloudinary.com/v1_1/hmrzthc6f/image/upload', file)
			// 	.then((response) => response.json())
			// 	.then(async (result) => {
			// 		console.log(result);
			// 		res.json({ url: result.url });
			// 	})
			// 	.catch((error) => {
			// 		console.log('error', error);
			// 		// setIsLoading(false);
			// 	});
		} catch (e) {
			console.log('error updating Status', e);
			res.json({ code: 'ABT0001' });
		}
	}
};
