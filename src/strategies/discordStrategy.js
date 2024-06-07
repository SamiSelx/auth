const {Strategy} = require('passport-discord')
const passport = require('passport')

passport.serializeUser((user,done)=>{
    console.log("serializaing : ",user);
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    console.log("deserializeUser");
    done(null,id) // store id to req.user ,,  i'll change it and attach user and getting info from DB
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
        const user = {
            id:profile.id,
            username: profile.username,
            status: "success"
        }
        done(null,user)
    }
    else {
        const user = {
            id:profile.id,
            username: profile.username,
            status: "failed"
        }
        done(null,user)
    }
}
))