import mongoose from "mongoose";
import path from 'path'
import  type { Request,Response ,NextFunction} from "express";

const clearSession =  async (req:Request,res:Response,next: NextFunction)=>{
    console.log("from /: ",req.user);
    // req.user?.status == "failed" ? res.clearCookie('discord-auth') : null //clearSession(req.id,res)
    if(req.user?.status == "failed"){
        res.clearCookie('discord-auth')
        const collection = mongoose.connection.db.collection('sessions')
        const results = await collection.find({}).toArray()
        const session = results.find(result=> {
            if(JSON.parse(result.session).passport.user == req.user?._id) return result
            
        })
        console.log("collect",session);
        const deleteSession = await collection.deleteOne({_id:session?._id})
        console.log(deleteSession);
    }
    
    res.sendFile(path.join(__dirname,'../public/index.html'))
}

export default clearSession