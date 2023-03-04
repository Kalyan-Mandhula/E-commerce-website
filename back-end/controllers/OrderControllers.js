const Order = require("../Models/Order");
const Product = require("../Models/Product")
const ObjectId = require("mongodb").ObjectId

const GetOrders = async (req, res, next) => {
  try {
    let orders = await Order.find({user : req.params.id}).populate("user","-password -createdAt -admin -_v");
    res.send(orders);
  } catch (err) {
    next(err);
  }
};


const ViewOrder = async(req,res,next)=>{
  try{
      let order = await Order.findById(req.params.id).populate("user" ,"-password -admin -_id -_v -createAt -updatedAt")
      res.send({
        user : order.user ,
        itemsCount : order.orderTotal.itemsCount ,
        cartSubtotal : order.orderTotal.cartSubtotal  ,
        cartItems : order.cartItems ,
        paymentMethod: order.paymentMethod,
        isPaid: order.isPaid,
        isDelivered: order.isDelivered,
        createdAt: order.createdAt,
        paidAt : order.paidAt

      })
  }catch(err){
      next(err)
  }
}

const GetOrderByIdForAdmin = async (req, res, next) => {
    try {
      let order = await Order.findById(req.params.id).populate("user","-password -createdAt -admin -_v");
      res.send(order);
    } catch (err) {
      next(err);
    }
  };

const CreateOrder = async (req, res, next) => {
  try {
    let { orderTotal, cartItems, paymentMethod } = req.body;

    let ids = cartItems.map((item)=>{
        return item._id
    })
    let qty = cartItems.map((item)=>{
        return item.quantity
    })

    ids.map (async (id,idx)=>{
        let product = await Product.findById(id)
        product.sales += qty[idx]
        await product.save()
    })

    let order = new Order(req.body)
    await order.save()
    res.send({
      _id : order._id ,
      user : order.user ,
      itemsCount : order.orderTotal.itemsCount ,
      cartSubtotal : order.orderTotal.cartSubtotal  ,
      cartItems : order.cartItems ,
      paymentMethod: order.paymentMethod,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
      createdAt: order.createdAt,
      paidAt : order.paidAt
    })
     
  } catch (err) {
    next(err);
  }
};

const UpdateTOPaid = async(req,res,next)=>{
    try{
        let order = await Order.findById(req.query.id)
        order.isPaid = true 
        order.paidAt = Date.now()
        await order.save()
        res.send(order)
    }catch(err){
        next(err)
    }
}

const UpdateTODelivered = async(req,res,next)=>{
    try{
        let order = await Order.findById(req.params.id)
        order.isDelivered = true 
        order.deliveredAt = Date.now()
        await order.save()
        res.send(order)
    }catch(err){
        next(err)
    }
}

const GetOrdersForAdmin = async(req,res,next)=>{
    try{
        let orders = await Order.find({}).populate("user","-password -createdAt -admin -_v")        
        res.send(orders)

    }catch(err){
      console.log(err)
        next(err)
    }
}

const GetOrdersForAnalysis = async(req,res,next)=>{
    try{
          const start = new Date(req.query.date)
          start.setHours(0,0,0,0)

          const end = new Date(req.query.date)
          end.setHours(23,59,59,999)

          const orders = await Order.find({
            createdAt :{
                $gte :start,
                $lte :end
            }
          })
          res.send(orders)
    }catch(err){
        next(err)
    }
}

module.exports = { GetOrders,ViewOrder, CreateOrder,UpdateTOPaid,UpdateTODelivered,GetOrdersForAdmin,GetOrdersForAnalysis,GetOrderByIdForAdmin};
