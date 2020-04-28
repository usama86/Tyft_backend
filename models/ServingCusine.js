const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    CusineName:Array
});

export const ServingCusine = mongoose.model('ServingCusine', Schema);