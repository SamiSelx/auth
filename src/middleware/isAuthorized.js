
const isAuthorized = async (req,res,next)=>{
    console.log(req.user);
    req.user != undefined ? next() : res.redirect('/')
}

module.exports = {isAuthorized}
