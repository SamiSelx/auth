
const isAuthorized = (req,res,next)=>{
    console.log("from auth",res.user);
    req.user != undefined ? next() : res.redirect('/')
    
}

module.exports = {isAuthorized}
