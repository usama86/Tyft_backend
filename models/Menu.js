const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    Menu:{
    id: Number,
    name: String,
    price: Number,
    description: String,
    category: String
    }
})
export const Menu = mongoose.model('Menu', Schema);