// const path = require("path");

const express = require("express");
const productsController = require("../controllers/products");

// const rootDir = require("../util/path");
const router = express.Router();
// const adminData = require("./admin");

router.get("/", productsController.getProducts);

//화면에 렌더링 되어야 하는 데이터를 render의 두번째 메서드로 추가해준다.
//render메서드는 pug파일을 렌더링해준다.
//app.js에서 app.set으로 view engine속성을 pug로 설정했음

module.exports = router;
// export.routes = router;
