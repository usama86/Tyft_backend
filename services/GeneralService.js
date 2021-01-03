const General = require('../models/General');

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
			General.find({ _id: reqBody._id }).exec().then(async (user) => {
				if (user.length < 1) {
					res.json({ code: "ID doesn't exist" });
				} else {
					let updateResult = await User.update(
						{ _id: reqBody._id },
						{ $set: { MapRadius: reqBody.MapRadius } }
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
			console.log('error updating Status', e);
			res.json({ code: 'ABT0001' });
		}
	}
};
