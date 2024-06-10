import {Strategy} from "passport-discord";
import passport from "passport";
import DiscordUserModel from '../models/discordUser.model'
import type { DiscordUserI } from "../types/User";
import dotenv from 'dotenv'
dotenv.config()

declare global {
  namespace Express {
    interface User {
      _id: string;
      username?: string;
      status: string;
      isRegistred?: boolean;
    }
  }
}

// interface User {
//     _id: string;
//     username?: string;
//     status: string;
//     isRegistred?:boolean;
// }

passport.serializeUser((user,done)=>{
    console.log("serializaing : ",user);
    done(null,user._id)
})

passport.deserializeUser(async (_id:string,done)=>{
    console.log("deserializeUser",_id);
    const user = await DiscordUserModel.findOne({_id:_id})
    user ? done(null,user) : done(null,{_id:_id,status:"failed"})
})

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID!,
    clientSecret:process.env.CLIENT_SECRET!,
    callbackURL:'http://localhost:5000/auth/discord/redirect',
    scope:['identify','guilds']
},
async (accessToken,refreshToken,profile:Strategy.Profile,done)=>{
    const mcGuild = profile.guilds?.find(guild => guild.id == "505471440250994718")

    try {
        if(mcGuild) {
            console.log("user on discord : ",mcGuild.name);
            const user:DiscordUserI = {
                _id:profile.id,
                username: profile.username,
                status: "success",
                isRegistred:false
            }
            const findUser = await DiscordUserModel.findById(user._id)
            if(!findUser) {
                await DiscordUserModel.create(user)
            }
            done(null,user)
        }
        else {
            const user:DiscordUserI = {
                _id:profile.id,
                username: profile.username,
                status: "failed",
                isRegistred:false
            }
            done(null,user)
        }
    } catch (err) {
        console.log(err);
        done(err,undefined)
    }
}
))