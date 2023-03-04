require("dotenv").config()
const connectDB = require("../config/db")
connectDB()

const categories = require("./CategorySeed")
const Category = require("../Models/Category")

const products = require("./ProductSeed")
const Product = require("../Models/Product")

const Review = require("../Models/Review")
const reviews = require("./ReviewSeed")

const User = require("../Models/User")
const users = require("./UserSeed")

const Order = require("../Models/Order")
const orders = require("./OrderSeed")

const CategorySeeder = async (req,res)=>{
    try{

        await Category.collection.dropIndexes()
        await Product.collection.dropIndexes()

        
        await Category.deleteMany({})
        await Product.deleteMany({})     
        await Review.deleteMany({}) 
        await User.deleteMany({})  
        await Order.deleteMany({})        

        if(process.argv[2] !=="-d"){
            await Category.insertMany(categories)
        const FinalReviews = await Review.insertMany(reviews)

        const FinalProducts = products.map((product)=>{
            FinalReviews.map((review)=>{
                product.reviews.push(review._id)
            })
            return {...product}
        })
        await Product.insertMany(FinalProducts)
        await User.insertMany(users)
        await Order.insertMany(orders)

        console.log("seed added")
        }

        console.log("deleted old data")
        process.exit()
    }
    catch(err){
       console.log(err)
    }
    
}

CategorySeeder()