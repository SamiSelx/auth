import type { NextFunction, Request,Response } from "express";

const isAuthorized = async (req:Request,res:Response,next:NextFunction)=>{
    
    req.user != undefined ? next() : res.redirect('/')
}

export default isAuthorized
