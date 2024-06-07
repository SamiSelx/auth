require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const path = require('path')
const session = require('express-session')
const passport = require('passport')
require('./strategies/discordStrategy')
// Routes
const router = require('./routes/discordAPI')


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


app.use('/auth/discord',router)


app.get('/',(req,res)=>{
    console.log(req.user);
    // res.status(200).send(req.user)
    res.sendFile(path.join(__dirname,'/public/index.html'))
})



app.listen(port,()=>{console.log(`server started localhost:${port}`)})