const mongoose = require("mongoose")


let ReviewSchema = mongoose.Schema({
    comment : {
        type : String ,
        required : true 
    },
    rating : {
        type : Number ,
        required : true ,
    },
    user : {
        _id : {
            type : mongoose.Schema.Types.ObjectId ,
            required : true 
        },
        name : {
            type : String,
            required:true
        },
        lastName : {
            type : String 
        }
    }
},{timestamps : true})


let Review = mongoose.model('review',ReviewSchema)

module.exports = Review