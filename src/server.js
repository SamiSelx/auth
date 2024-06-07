require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const path = require('path')
const session = require('express-session')
const passport = require('passport')
require('./strategies/discordStrategy')
// Routes
const discordApiRouter = require('./routes/discordAPI')
const ApiConfigurationRouter = require('./routes/ApiConfiguration')

app.use(session({
    secret:'sam secret',
    cookie:{
        maxAge: 80000 * 60 * 24
    },
    saveUninitialized: false,
    name:"discord-auth"
}))


app.use(passport.initialize())
app.use(passport.session())

// parse form
app.use(express.urlencoded({extended:true}))

//parse json
app.use(express.json())


app.use('/auth/discord',discordApiRouter)
app.use('/',ApiConfigurationRouter)

app.get('/',(req,res)=>{
    console.log("from /: ",req.user);
    req.user?.status == "failed" ? res.clearCookie('discord-auth') : null
    
    // res.status(200).send(req.user)
    res.sendFile(path.join(__dirname,'/public/index.html'))
})



app.listen(port,()=>{console.log(`server started localhost:${port}`)})