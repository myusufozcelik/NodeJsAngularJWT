let express = require('express')
let mongoose = require('mongoose')
let app = express();
let bodyParser = require('body-parser')
let Author = require('./models/author.js');
let User = require('./models/user')
let cors = require('cors')
const { response } = require('express');
let author = require('./services/author.service')
let user = require('./services/user.service')

app.use(cors()) // frontend kısmında hata vermemesi için corsu ekledik

app.use(bodyParser.json())
// gelen veriyi jsona çevir. Hem post ederken de get ile alırken de json tipinde gönderir ve alırız. 

 


mongoose.connect("mongodb+srv://myusufozcelik:M.Yusuf06@cluster0.opdx5.mongodb.net/<dbname>?retryWrites=true&w=majority",(error)=> {
    if(!error) {
        console.log('connected to db')
    }
})

app.use('/author',author.router)
app.use('/user',user.router)

app.listen(8080,(err)=> {
    if(err) console.log(err.error)
})
