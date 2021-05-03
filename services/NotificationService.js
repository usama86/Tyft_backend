const Notification = require('../models/Notification');

module.exports = {
	async getNotification(req, res) {
		try {
			const Notifications = await Notification.find();
			res.send(Notifications);
		} catch (e) {
			console.log('error getting Notification', e);
			res.json({ code: 'ABT0001' });
		}
	},
};
