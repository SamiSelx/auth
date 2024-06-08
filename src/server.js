require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const clearSession = require('./controllers/clearSession')
require('./strategies/discordStrategy')

// Routes
const discordApiRouter = require('./routes/discordAPI')
const ApiConfigurationRouter = require('./routes/ApiConfiguration')

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
app.use('/',ApiConfigurationRouter)

app.get('/',async (req,res)=>{
    console.log("from /: ",req.user);
    // req.user?.status == "failed" ? res.clearCookie('discord-auth') : null //clearSession(req.id,res)
    if(req.user?.status == "failed"){
        console.log("inside failed");
        res.clearCookie('discord-auth')
        const collection = mongoose.connection.db.collection('sessions')
        const results = await collection.find({}).toArray()
        const session = results.find(result=> {
            console.log("inside reduce: ",result,JSON.parse(result.session).passport.user,req.user._id);
            if(JSON.parse(result.session).passport.user == req.user._id) return result
            
        })
        console.log("collect",session);
        const deleteSession = await collection.deleteOne({_id:session?._id})
        
        // res.clearCookie('discord-auth')
    }
    console.log(req.user);
    
    // const deleteSession = await collection.deleteOne({session: JSON.parse(res.session).passport.user == req.id}) we can do with regexp
    // console.log("delete result : ",deleteSession);
    // res.status(200).send(req.user)
    res.sendFile(path.join(__dirname,'/public/index.html'))
    
})





app.listen(port,()=>{console.log(`server started localhost:${port}`)})