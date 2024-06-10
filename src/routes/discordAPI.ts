import express, {Response,Request} from 'express'
import passport from 'passport'
const router = express.Router()

router.get('/',passport.authenticate('discord'),(req:Request,res:Response)=>{
    res.send(200)
})

router.get('/redirect',passport.authenticate('discord',{
    failureRedirect:'/',
    // successRedirect:'/registre'
}),(req : Request,res: Response)=>{
    console.log("inside redirect",req.user);
    req.user?.status == "success" ? res.redirect('/registre') : res.redirect('/')

    // res.send(req.user)

})



export default router