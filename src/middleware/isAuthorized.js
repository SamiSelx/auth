const mongoose = require('mongoose')

const isAuthorized = async (req,res,next)=>{
    console.log("from auth",res.user,res.user != undefined)
    console.log("from postman");

    console.log(req.user);
    req.user != undefined ? next() : res.redirect('/')
}

module.exports = {isAuthorized}
