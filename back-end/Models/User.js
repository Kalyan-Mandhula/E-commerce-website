const mongoose = require("mongoose")

let UserSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        unique : true
    },
    lastName : {
        type : String ,
        required :true
    },
    email :{
        type :String ,
        required : true ,
        unique : true
    },
    country :{
        type :String 
    },
    state :{
        type :String 
    },
    city:{
        type :String 
    },
    zipcode :{
        type :Number 
    },
    password :{
        type :String ,
        required : true ,
    },
    phone :{
        type :String 
    },
    admin :{
        type :Boolean ,
       default:false
    }
})


let User = mongoose.model('user', UserSchema)


module.exports = User