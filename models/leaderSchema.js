const mongoose = require('mongoose')
const Schema = mongoose.Schema

const leaderSchema = new Schema({
    id: Number,
    name: String,
    // image: Image,
    designation: String,
    abbr: String,
    description: String,
    featured: Boolean,
}, {timestamps: true})

const Leaders = mongoose.model('Leaders', leaderSchema)
module.exports = Leaders