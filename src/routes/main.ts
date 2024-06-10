import express from 'express'
import clearSession from '../middleware/clearSession'
const router = express.Router()

router.get('/',clearSession)

export default router
