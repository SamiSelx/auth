const express = require('express')
const router = express.Router()
const {isAuthorized} = require('../middleware/isAuthorized')
const mongoose = require('mongoose')
const UserModel = require('../models/user.model')


router.get('/registre',isAuthorized,(req,res)=>{
    console.log("from registre",req.user);
    // req.user?.status == "failed" ? res.redirect('/') : res.send(200)
    res.send(200)
    
})

router.post('/registre',isAuthorized, async(req,res)=>{
    console.log("hey");
    // if(req.user == "failed"){
    //     res.redirect('/')
    //     res.end()
    //     return
    // }
    console.log(req.body);
    try {
        const newUser = await UserModel.create(req.body)
        res.status(200).json({status:"success",message:"data was successfully added",data:newUser})
    } catch (error) {
        res.status(501).json({status:"failed",message:"failed to added on DB",error: error})
    }
    
})




module.exports = router