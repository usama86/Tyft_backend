const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    Menu:[{
    name: String,
    price: Number,
    description: String,
    category: String
    }]
})
module.exports = mongoose.model('Menu', Schema);
