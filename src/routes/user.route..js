const express = require('express')
const router = express.Router()
const {isAuthorized} = require('../middleware/isAuthorized')
const handleRegistre = require('../controllers/registre')

router.get('/registre',isAuthorized,(req,res)=>{
    res.send(200)
})

router.post('/registre',handleRegistre )


module.exports = router