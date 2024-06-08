const UserModel = require('../models/user.model')
const {userValidator} = require('../utils/schemaValidator')

const handleRegistre = async(req,res)=>{
    if(!req.user || req.user?.status == "failed"){
        res.status(401).json({status:"failed",message:"failed to added on DB",error: "u should be authorized"})
        return
    }
    try {
        await userValidator.validateAsync(req.body)
        const newUser = await UserModel.create(req.body)
        res.status(200).json({status:"success",message:"data was successfully added",data:newUser})
    } catch (error) {
        res.status(501).json({status:"failed",message:"failed to added on DB",error: error})
    }
    
}

module.exports = handleRegistre