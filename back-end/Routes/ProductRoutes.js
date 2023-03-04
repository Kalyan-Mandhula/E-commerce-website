const express = require("express")
const router = express.Router()

const CheckLogin = require("../middleswares/CheckLogin")
const CheckAdmin = require("../middleswares/CheckAdmin")
const { GetProducts,GetProductsForSearch,GetBestSellers,GetProductByCategory, GetProductById,GetProductByName, GetAdminProducts, AddProduct, DeleteProduct, UpdateProduct, UploadImages, DeleteImages } = require("../controllers/ProductControllers")


router.get("/getAdminProducts",CheckLogin,CheckAdmin, GetAdminProducts)

// Roures for users
router.get("/",GetProducts)
router.get("/GetProductsForSearch",GetProductsForSearch)
router.get("/GetBestSellers",GetBestSellers)
router.get("/getProductsByCategory/:Category",GetProductByCategory)
router.get("/:id",GetProductById)
router.get("/GetProductByName/:name",GetProductByName)

// Routes for admin


router.post("/",CheckLogin,CheckAdmin,AddProduct)
router.delete("/:id",CheckLogin,CheckAdmin, DeleteProduct)
router.put("/:id",CheckLogin,CheckAdmin, UpdateProduct)
router.post("/uploadImage/:productId",CheckLogin,CheckAdmin, UploadImages) //==> upload Imaeges /uploadImage/:productId
router.delete("/deleteImage/:imageId/:productId",CheckLogin,CheckAdmin,DeleteImages)  //==> upload Imaeges /uploadImage/:imageId/:productId

module.exports = router