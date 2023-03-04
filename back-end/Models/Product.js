
const mongoose = require("mongoose")

const Review = require("./Review")

let ProductSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        unique : true
    },
    description : {
        type : String ,
        required : true 
    },
    category : {
        type : String ,
        required : true 
    },
    count : {
        type : Number ,
        required : true ,
    },
    price : {
        type : Number ,
        required : true ,
    },
    rating : {
        type : Number ,
        default : 0
    },
    reviewsNumber : {
        type : Number ,
        default : 0

    },
    sales :{
        type : Number,
        default : 0
    },
    attributes : [ {key : {type : String},value :{type:String}} ],
    images : [{path :{type : String , required : true}}] ,
    reviews :[{type : mongoose.Schema.Types.ObjectId , ref: Review}]
},{timestamps : true})


let Product = mongoose.model('product',ProductSchema)

ProductSchema.index({name:"text" , description:"text"},{name:"TextIndex"})
ProductSchema.index({"attributes.key":1,"attributes.value":1})

module.exports = Product