const express = require("express")
const router = express.Router()

const CheckLogin = require("../middleswares/CheckLogin")
const CheckAdmin = require("../middleswares/CheckAdmin")

const {GetCategories , AddCategory , AddAttributes, DeleteCategory }= require("../controllers/CategoryControllers")

router.get("/",GetCategories)
router.post("/",CheckLogin,CheckAdmin,AddCategory)
router.post("/attributes",CheckLogin,CheckAdmin,AddAttributes)
router.delete("/:category",CheckLogin,CheckAdmin,DeleteCategory)

module.exports = router