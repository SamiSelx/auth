const mongoose = require('mongoose')

const clearSession =  (id,res)=>{
    res.clearCookie('discord-auth')
}

module.exports = clearSession