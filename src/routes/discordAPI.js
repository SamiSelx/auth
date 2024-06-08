const express = require('express')
const router = express.Router()
const passport = require('passport')

console.log("route");
router.get('/',passport.authenticate('discord'),(req,res)=>{
    res.send(200)
})

router.get('/redirect',passport.authenticate('discord',{
    failureRedirect:'/',
    // successRedirect:'/registre'
}),(req,res)=>{
    console.log("inside redirect",req.user);
    req.user?.status == "success" ? res.redirect('/registre') : res.redirect('/')

    // res.send(req.user)


})

module.exports = router