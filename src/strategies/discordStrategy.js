const {Strategy} = require('passport-discord')
const passport = require('passport')

let user = {}

passport.serializeUser((user,done)=>{
    console.log("serializaing : ",user);
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    console.log("deserializeUser",id);

    done(null,user) // store id to req.user ,,  i'll change it and attach user and getting info from DB
})

passport.use(new Strategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'http://localhost:5000/auth/discord/redirect',
    scope:['identify','guilds']
},
async (accessToken,refreshToken,profile,done)=>{
    console.log(accessToken,refreshToken);

    const mcGuild = profile.guilds.find(guild => guild.id == "505471440250994718")

    if(mcGuild) {
        console.log("user on discord : ",mcGuild.name);
         user = {
            id:profile.id,
            username: profile.username,
            status: "success"
        }
        done(null,user)
    }
    else {
         user = {
            id:profile.id,
            username: profile.username,
            status: "failed"
        }
        done(null,user)
    }
}
))