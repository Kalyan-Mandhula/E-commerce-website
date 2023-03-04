
const mongoose = require("mongoose")


const connectDB = async ()=>{
    try{
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true ,
        useUnifiedTopology :true
    })
    console.log("MongoDB Connected")

    }catch(err){
        console.log("MongoDB Connection Failed")
        process.exit(1)
    }
}

module.exports = connectDB