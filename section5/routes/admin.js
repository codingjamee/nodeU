const path = require("path");
const express = require("express");

const rootDir = require("../util/path");
const router = express.Router();

//admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
//input의 name속성은 요청을 보낼 때 함께 보낸다.

//form action is path that is request url

// /admin/add-product=>POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
