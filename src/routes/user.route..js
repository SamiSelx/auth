const express = require('express')
const router = express.Router()
const {isAuthorized} = require('../middleware/isAuthorized')
const UserModel = require('../models/user.model')


router.get('/registre',isAuthorized,(req,res)=>{
    res.send(200)
})

router.post('/registre', async(req,res)=>{
    if(!req.user || req.user?.status == "failed"){
        res.status(401).json({status:"failed",message:"failed to added on DB",error: "u should be authorized"})
        return
    }
    try {
        const newUser = await UserModel.create(req.body)
        res.status(200).json({status:"success",message:"data was successfully added",data:newUser})
    } catch (error) {
        res.status(501).json({status:"failed",message:"failed to added on DB",error: error})
    }
    
})


module.exports = router