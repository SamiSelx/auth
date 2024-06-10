import express from 'express'
import type { Request,Response } from 'express'
import isAuthorized from '../middleware/isAuthorized'
import handleRegistre from '../controllers/registre'

const router = express.Router()
router.get('/registre',isAuthorized,(req:Request,res:Response)=>{
    res.send(200)
})

router.post('/registre',handleRegistre )


export default router