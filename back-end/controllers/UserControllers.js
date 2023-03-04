
const User = require("../Models/User")
const Product = require("../Models/Product")
const Review = require("../Models/Review")
const Order = require("../Models/Order")

let bycryptjs = require("bcryptjs")
let generateAuthToken = require("../utils/generateAuthToken")
let ObjectId = require("mongodb").ObjectId



const GetUsers = async (req,res,next)=>{
    try{
        let users = await User.find({}).sort({name:"asc"}).select("-password")
        res.send(users)
    }catch(err){
        next(err)
    }
}

const GetUserById = async(req,res,next)=>{
    try{
      const user = await User.findById(req.params.id).select("-password -createdAt ")
      res.send(user)
    }catch(err){
        next(err)
    }
}

const Register = async(req,res,next)=>{
    try{
        let {name,lastName,email,password} = req.body
        if(!(name && lastName && email && password)){
            res.send("Missing details")
        }else{

        let CheckUser = await User.findOne({email})
        if(CheckUser){
            res.send("user with registered mail id already exist")
        }else{
            
            let hashedpassword = bycryptjs.hashSync(password,10)
            req.body.password = hashedpassword
            CheckUser = new User(req.body)
            CheckUser.save()
            res.cookie("access_token",generateAuthToken(CheckUser._id ,CheckUser.name, CheckUser.lastName ,CheckUser.email,CheckUser.admin),{
                httpOnly :true,
                secure : process.env.NODE_ENV = "development",
                sameSite :"strict"
            }).json({
                success : "Registered Succesfully",
                User :{
                    _id : CheckUser._id ,
                    name :CheckUser.name,
                    lastName :CheckUser.lastName,
                    email : CheckUser.email,
                    isAdmin : CheckUser.admin,
                    doNotLogout :false
                }
            })
        }
        }
    }catch(err){
        next(err)
    }
}

const Login = async(req,res,next)=>{
    try{
        let {email,password,doNotLogout} = req.body
        if(!(email && password)){
            res.send("Require all inputs")
        }else{

        let CheckUser = await User.findOne({email})
        if(CheckUser && bycryptjs.compareSync(password,CheckUser.password)){
            let cookieParams = {
                httpOnly :true,
                secure :process.env.NODE_ENV === "production",
                sameSite :"strict"
            }

            if(doNotLogout){
                cookieParams = {...cookieParams , maxAge : 1000*60*60*24*7}
            }
            res.cookie("access_token",generateAuthToken(CheckUser._id ,CheckUser.name, CheckUser.lastName ,CheckUser.email,CheckUser.admin),
            cookieParams).json({
                success : "Logged in",
                User :{
                    _id : CheckUser._id ,
                    name :CheckUser.name,
                    lastName :CheckUser.lastName,
                    email : CheckUser.email,
                    isAdmin : CheckUser.admin,
                    doNotLogout :doNotLogout 
                }
            })

        }else{
            res.send("email or password is incorrect")
        }

        }
    }catch(err){
        next(err)
    }
}

const EditProfile = async(req,res,next)=>{
    try{

        await User.findOneAndUpdate({email : req.body.email},{...req.body,password:bycryptjs.hashSync(req.body.password,10)})
        let CheckUser = await User.findOne({email:req.body.email})
        res.json({
            success : "Updated Succesfully",
            User :{
                _id : CheckUser._id,
                name :CheckUser.name,
                lastName :CheckUser.lastName,
                email : CheckUser.email,
                isAdmin : false,
                doNotLogout :false
            }
        })

    }catch(err){
        next(err)
    }
}

const AddReview = async(req,res,next)=>{
    try{
        let product = await Product.findById(req.params.id)
        let {rating,comment} = req.body
        if(!(rating && comment)){
            res.status(403).send("All inputs required")
        }else{
            let review = new Review({...req.body})
            review.save()
            product.reviews.push(review)
            product.reviewsNumber += 1 
            product.rating = Math.round((product.rating + rating)/2)
            console.log(product.rating)
            await product.save()
            res.send("Review successfull")
        }

    }catch(err){
        next(err)
    }
}

const DeleteUser = async(req,res,next)=>{
    try{
       await User.findByIdAndDelete(req.params.id)
       res.send("User deleted")
    }catch(err){
        next(err)
    }
}

const EditedByAdmin = async(req,res,next)=>{
    try{
        console.log("ss")
       await User.findByIdAndUpdate(req.params.id,req.body)
    }catch(err){
        next(err)
    }
}

module.exports = {GetUsers,GetUserById,Register,Login,EditProfile ,AddReview ,DeleteUser,EditedByAdmin}