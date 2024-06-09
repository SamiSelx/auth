import express from "express";
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from "connect-mongo";
import  passport  from "passport";
import './strategies/discordStrategy'
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = process.env.PORT || 3000

// Routes
import discordApiRouter from './routes/discordAPI'
import mainRouter from './routes/main'
import userRouter from './routes/user.route'

const URI_MONGO:string = process.env.URI_MONGO!

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