import UserModel from '../models/user.model'
import { userValidator } from '../utils/schemaValidator'
import type { Request,Response } from 'express'
import type ResponseI from '../types/Response'

const handleRegistre = async(req:Request,res:Response)=>{
    if(!req.user || req.user?.status == "failed"){
        const response:ResponseI = {status:"failed",message:"failed to added on DB",error: "u should be authorized"}
        res.status(401).json(response)
        return
    }
    try {
        await userValidator.validateAsync(req.body)
        const newUser = await UserModel.create(req.body)
        const response:ResponseI = {status:"success",message:"data was successfully added",data:newUser}
        res.status(200).json(response)
    } catch (error) {
        const response:ResponseI = {status:"failed",message:"failed to added on DB",error: error}
        res.status(501).json(response)
    }
    
}

export default handleRegistre