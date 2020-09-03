
let Author = require('../models/author')
let express = require('express')
// Crud operasyonlarını dışarıya çıkarmak için router kullanılır. 
let router = express.Router();

let user = require('./user.service')
// let app = express() kullanırsak; 
// app.get('/author', async (req, res) => böyle de yapabiliriz.

router.get('',user.checkAuthenticated, async (req, res) => {
    let authors = await Author.find({}, '-__v'); // {} yazarsak boş bıraktığımız için hepsini getirir hiç bir şey yazmasakta olur yani find()
    // , '-__v' ifadesi get ile gelen v kısmını çıkarır 
    res.send(authors)
})

// http://localhost:8080/author/list ile gelir.

// /author da post isteği gelirse authorData verisine req.body sini ata
router.post('/add', user.checkAuthenticated, (req, res) => {
    let authorData = req.body
    let author = new Author(authorData)
    // let author = new Author(req.body) olarak ta yazabiliriz.
    author.save((error, result) => { // authoru save ederken error ya da result gelir
        if (error) {
            console.log(error)
            return res.sendStatus(500).send({ message: error }) // hata verirse 500 hatasını ve message:erroru göndersin.
        }
        // hata vermezse sonucu döndür
        res.send(author)

    })
})

let author = {router}
module.exports = author // böylece dışarı açmış  oluruz
