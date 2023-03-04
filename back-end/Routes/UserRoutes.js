const express = require("express")
const router = express.Router()
const { GetUsers,GetUserById, Register, Login, EditProfile ,AddReview, DeleteUser,EditedByAdmin} = require("../controllers/UserControllers")

let CheckLogin = require("../middleswares/CheckLogin")
let CheckAdmin = require("../middleswares/CheckAdmin")

router.put("/editByAdmin/:id",CheckLogin,CheckAdmin,EditedByAdmin)
router.get("/",CheckLogin,CheckAdmin,GetUsers)
router.get("/:id",CheckLogin,GetUserById)
router.post("/register",Register)
router.post("/login",Login)
router.delete("/deleteUser/:id",CheckLogin,CheckAdmin,DeleteUser)
router.put("/editProfile",CheckLogin,EditProfile)
router.post("/addReview/:id",CheckLogin,AddReview)


module.exports = router