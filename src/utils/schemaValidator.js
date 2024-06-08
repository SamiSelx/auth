const Joi = require('joi')

const userValidator = Joi.object({
    fullName:Joi.string().required(),
    email:Joi.string().email().required(),
    phoneNumber:Joi.string().pattern(/^0\d{9}$/).required(), // start with 0 and has 10 digits
    motivation: Joi.string().required()
})

module.exports = {userValidator}