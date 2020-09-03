let mongoose = require('mongoose')
let courseSchema = new mongoose.Schema({

    Name: String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:'Author'}
})

module.exports = mongoose.model('Course',courseSchema)