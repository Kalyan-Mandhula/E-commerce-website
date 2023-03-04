const mongoose = require("mongoose")

let CategorySchema = mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        unique : true
    },
    description : {
        type : String ,
        default :"Description not specified"
    },
    attributes : [ {key : {type : String}, value :[{type:String}] }],
    image : {type :String} 
})


let Category = mongoose.model('category', CategorySchema)

CategorySchema.index({name : 1})


module.exports = Category

