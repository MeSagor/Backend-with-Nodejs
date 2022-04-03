const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishes = new Schema({
    id: Number,
    name: String,
    // image: Image,
    price: String,
    description: String,
    featured: Boolean,
}, {timestamps: true})

const Dishes = mongoose.model('Dishes', dishes)
module.exports = Dishes