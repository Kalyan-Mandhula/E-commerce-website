const express = require("express")
const router = express.Router()

const CheckLogin = require("../middleswares/CheckLogin")
const CheckAdmin = require("../middleswares/CheckAdmin")
const { GetOrders, ViewOrder, CreateOrder, UpdateTOPaid, UpdateTODelivered, GetOrdersForAdmin, GetOrdersForAnalysis, GetOrderByIdForAdmin } = require("../controllers/OrderControllers")

router.get("/admin",CheckLogin,CheckAdmin,GetOrdersForAdmin)
router.get("/getOrdersForAnalysis",CheckLogin,CheckAdmin,GetOrdersForAnalysis)
router.get("/:id",CheckLogin, GetOrders)
router.get("/getOrderById/:id",CheckLogin,ViewOrder)
router.get("/admin/:id",CheckLogin,CheckAdmin, GetOrderByIdForAdmin)
router.post("/",CheckLogin,CreateOrder)
router.put("/paid",CheckLogin,UpdateTOPaid)
router.put("/delivered/:id",CheckLogin,CheckAdmin,UpdateTODelivered)


module.exports = router