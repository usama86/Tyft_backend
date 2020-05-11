const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    Menu:[{
    name: String,
    price: Number,
    description: String,
    category: String
    }]
})
export const Menu = mongoose.model('Menu', Schema);
