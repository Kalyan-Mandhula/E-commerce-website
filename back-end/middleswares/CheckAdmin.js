let JWT = require("jsonwebtoken")

const CheckAdmin = (req,res,next)=>{
    try{
         if(req.user && req.user.admin){
            next()
         }else{
            res.status(403).send("You are not an admin")
         }
    }catch(err){
        next(err)
    }
}

module.exports = CheckAdmin