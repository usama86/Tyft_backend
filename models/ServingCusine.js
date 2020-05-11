const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    CusineName:Array
});

module.exports = mongoose.model('ServingCusine', Schema);