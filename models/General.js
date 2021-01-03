const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    MapRadius: {type: Number, default: 16093.4 },
  });

module.exports = mongoose.model('General', Schema);