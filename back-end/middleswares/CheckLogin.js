let JWT = require("jsonwebtoken")

const CheckLogin = (req,res,next)=>{
    try{
        let token = req.cookies.access_token
        if(!token){
           return res.status(400).send("You need to login")
        }
         
        try{
            let decoded = JWT.verify(token,process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        }catch(err){
            return res.status(403).send("need valid token")
        }
        

    }catch(err){
        next(err)
    }
}

module.exports = CheckLogin