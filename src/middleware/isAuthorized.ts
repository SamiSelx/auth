import type { NextFunction, Request,Response } from "express";

const isAuthorized = async (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.user);
    req.user != undefined ? next() : res.redirect('/')
}

export default isAuthorized
