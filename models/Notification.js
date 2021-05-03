const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
	profileName: String,
	created_at: { type: Date, default: Date.now },
	userType: String,
	userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', Schema);
