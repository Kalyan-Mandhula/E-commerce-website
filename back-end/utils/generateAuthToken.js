const JWT = require("jsonwebtoken")

const generateAuthToken = (_id,name,lastName,email,admin)=>{
    return JWT.sign({_id,name,lastName,email,admin},
        process.env.JWT_SECRET_KEY,
        {
            expiresIn :"7h"
        })
}

module.exports = generateAuthToken