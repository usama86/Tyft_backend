const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    MapRadius: {type: Number },
  });

module.exports = mongoose.model('General', Schema);