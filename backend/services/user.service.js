 let express = require('express')
 let router = express.Router();
 let User = require('../models/user');
 let jwt = require('jwt-simple')
const { response } = require('express');

 router.post('/register',(req,res)=> {
     let userData = req.body // giden kullanıcı bilgilerini alıp user nesnesine çevir.
     let user = new User(userData)

     user.save((error,result)=> {
        if(error) console.log("Error saving the user")
       return  res.status(201).send({message:'Save is successfull'}) // ifade başarılı ise kullanıcıya dönceke kısım
     })
 })

 router.get('/register', async (req,res)=> {
    let register = await User.find({});
    res.send(register)
 })




 // insert yapmayıp sadece datayı okuyacağımız için async yapıyoruz.
 router.post('/login',async (req,res)=> {
     let userData = req.body
     // emaile göre kontrol edelim. findOne ile email ifadesine userDatanın emailini alalım.
     let user = await User.findOne({email:userData.email})
     if(!user) {
         return res.status(401).send({message:'Email or password invalid'})
     }

     if(userData.password != user.password) {
         return res.status(401).send({message:'Email or password invalid'})
     }
// başarılı ise token oluşturalım
// encode token oluşturur, decode token çözer
// parametre olarak payload ve key alır. payload bilgi tutar.
     let payload = {} // şimdilik boş gönderelim
     let token = jwt.encode(payload,'12345')
     return res.status(200).send({message:'The process is successfull',token})
     // message ya da başka şeyler oluşturmak bize kalmış, burası kullanıcıya dönen kısım. Hiç bir şey yazmasakta olur.
    })

// checkAuthenticated ile kullanıcının giriş yapıp yapmadığını kontrol ederiz.
 let user = {router,checkAuthenticated:(req,res,next)=>{
    
    if(!req.header('authorization')) return res.status(401).send({message:'Unauthorized, No Authorization Header'})

    let token = req.header('authorization').split(' ')[1]
    // front kısmında auth-interceptor.service kısmında token boşluk, token ifadesini yazdığımız için sağ taraftaki token değerini alacağımız için 1. diziyi alıyoruz 
    
    // token geçerli mi diye kontrol edelim? 

    let payload = jwt.decode(token,'12345') // şifrelerken 12345 diye key değeri vermiştik. Decode etmek için de şifreyi vermemiz gerekli
    
    if(!payload) {
        return res.status(401).send({message:'Unauthorized, token is not valid.'})
    }


    next(); // Her şey yolunda çalışabilirsin demek
// routerları dışa açtık 
}} 

module.exports = user