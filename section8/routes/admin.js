const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAddProduct);
// /admin/add-product에서 get request를 할때 실행할 함수

//admin/products
router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProduct);
// /admin/add-product에서 post request를 할때 실행할 함수

module.exports = router;
