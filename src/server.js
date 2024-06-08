require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
require('./strategies/discordStrategy')

// Routes
const discordApiRouter = require('./routes/discordAPI')
const mainRouter = require('./routes/main')
const userRouter = require('./routes/user.route.')

const URI_MONGO = process.env.URI_MONGO

mongoose.connect(URI_MONGO)
.then(()=> console.log("Mongo connected"))
.catch(()=>console.log("connection failed"))


app.use(session({
    secret:'sam secret',
    cookie:{
        maxAge: 60000 * 60 * 48 // session for 2 days (48h)
    },
    saveUninitialized: false,
    resave:false,
    name:"discord-auth",
    store: MongoStore.create({mongoUrl:URI_MONGO})
}))


app.use(passport.initialize())
app.use(passport.session())

// parse form
app.use(express.urlencoded({extended:true}))

//parse json
app.use(express.json())


app.use('/auth/discord',discordApiRouter)
app.use('/',userRouter)
app.use('/',mainRouter)




app.listen(port,()=>{console.log(`server started localhost:${port}`)})