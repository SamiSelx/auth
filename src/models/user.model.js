const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        fullName:{
            type: String,
            required : true
        },
        email: {
            type:String,
            required:true
        },
        phoneNumber: {
            type:Number,
            required:true
        },
        motivation: {
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel