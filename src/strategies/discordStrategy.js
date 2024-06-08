const {Strategy} = require('passport-discord')
const passport = require('passport')
const mongoose = require('mongoose')
const DiscordUserModel = require('../models/discordUser.model')
// let user = {}

passport.serializeUser((user,done)=>{
    console.log("serializaing : ",user);
    done(null,user._id)
})

passport.deserializeUser(async (_id,done)=>{
    console.log("deserializeUser",_id);

    const user = await DiscordUserModel.findOne({_id:_id})
    console.log(user);
    user ? done(null,user) : done(null,{_id:_id,status:"failed"})
})

passport.use(new Strategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'http://localhost:5000/auth/discord/redirect',
    scope:['identify','guilds']
},
async (accessToken,refreshToken,profile,done)=>{
    console.log(accessToken,refreshToken);
    console.log("annuler",profile);
    const mcGuild = profile.guilds.find(guild => guild.id == "505471440250994718")

    try {
        if(mcGuild) {
            console.log("user on discord : ",mcGuild.name);
            const user = {
                _id:profile.id,
                username: profile.username,
                status: "success"
            }
            const findUser = await DiscordUserModel.findById(user._id)
            if(!findUser) {
                await DiscordUserModel.create(user)
            }
            done(null,user)
        }
        else {
            const user = {
                _id:profile.id,
                username: profile.username,
                status: "failed"
            }
            done(null,user)
        }
    } catch (err) {
        console.log(err);
        done(err,null)
    }
}
))