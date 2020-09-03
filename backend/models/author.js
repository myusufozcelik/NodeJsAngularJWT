let mongoose = require('mongoose')
let authorSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    age:Number,
    bio:String
})

module.exports = mongoose.model('Author',authorSchema)