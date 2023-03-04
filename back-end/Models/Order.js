
const mongoose = require("mongoose")

const User = require("./User")
let io = require("../app")


let OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default :null 
    },
    orderTotal: {
        itemsCount: {type: Number, required: true},
        cartSubtotal: {type: Number, required: true}
    },
    cartItems: [
        {
            name :{type :String},
            price :{type :Number},
            images :[{path :{type :String}}],
            count :{type :Number},
            quantity: {type: Number},
            _id : {type : String}
        }
    ],
    transactionResult: {
        status: {type: String},
        createTime: {type: String},
        amount: {type: Number}
    },
    paymentMethod :{
      type:String
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    }
}, {
    timestamps: true,
})

let Order = mongoose.model('order',OrderSchema)

Order.watch().on("change",(data)=>{
    if(data.operationType == "insert"){
        io.emit("newOrder",data.fullDocument)
    }
})

module.exports = Order