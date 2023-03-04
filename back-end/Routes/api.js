const express = require("express")
const app = express()

const ProductRoutes = require("./ProductRoutes")
const CategoryRoutes = require("./CategoryRoutes")
const OrderRoutes = require("./OrderRoutes")
const UserRoutes = require("./UserRoutes")


const jwt = require("jsonwebtoken")

app.get("/getToken",(req,res)=>{
    try{
        const access_token = req.cookies["access_token"]
        const decoded = jwt.verify(access_token,process.env.JWT_SECRET_KEY)
        return res.json({isAuth:true , isAdmin :decoded.admin})
    }catch(err){
        res.send("Invalid token")
    }
    
})

app.get("/logout",(req,res)=>{
    return res.clearCookie("access_token").send("Logged out")
})

app.use("/products",ProductRoutes)
app.use("/categories",CategoryRoutes)
app.use("/orders",OrderRoutes)
app.use("/users",UserRoutes)


module.exports = app