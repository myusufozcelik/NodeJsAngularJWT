let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    age:Number
  })

module.exports = mongoose.model('User',userSchema)