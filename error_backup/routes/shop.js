// const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/products", shopController.getProducts);

//순서가 중요..
///products/delete라우트는 위에 있어야.
//안그러면 productId라우트에서 걸려서 넘어가지 않음

// router.get("/products/delete/:productId");

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postDeleteCartItem);

router.get("/orders", shopController.getOrders);

router.post("/crate-order", shopController.postOrder);

router.get("/", shopController.getIndex);

module.exports = router;
