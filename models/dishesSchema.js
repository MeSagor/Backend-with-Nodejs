const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishes = new Schema({
    name: String,
    price: String,
    comments: [
        {email: String, body: String}
    ],
}, {timestamps: true})

const Dishes = mongoose.model('Dishes', dishes)
module.exports = Dishes