const mongoose = require('mongoose')
const path = require('path')

const clearSession =  async (req,res,next)=>{
    console.log("from /: ",req.user);
    // req.user?.status == "failed" ? res.clearCookie('discord-auth') : null //clearSession(req.id,res)
    if(req.user?.status == "failed"){
        res.clearCookie('discord-auth')
        const collection = mongoose.connection.db.collection('sessions')
        const results = await collection.find({}).toArray()
        const session = results.find(result=> {
            if(JSON.parse(result.session).passport.user == req.user._id) return result
            
        })
        console.log("collect",session);
        const deleteSession = await collection.deleteOne({_id:session?._id})
        console.log(deleteSession);
    }
    console.log(req.user);
    
    // const deleteSession = await collection.deleteOne({session: JSON.parse(res.session).passport.user == req.id}) we can do with regexp
    // console.log("delete result : ",deleteSession);
    // res.status(200).send(req.user)
    res.sendFile(path.join(__dirname,'../public/index.html'))
}

module.exports = clearSession