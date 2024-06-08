const express = require('express')
const router = express.Router()
const clearSession = require('../middleware/clearSession')

router.get('/',clearSession)

module.exports = router
