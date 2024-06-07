const express = require('express')
const router = express.Router()
const {isAuthorized} = require('../middleware/isAuthorized')



router.get('/registre',isAuthorized,(req,res)=>{
    console.log("from registre",req.user);
    res.send(200)
})



module.exports = router