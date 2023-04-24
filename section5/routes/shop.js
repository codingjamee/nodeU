const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
}); //path.join detects the operating system we're running on
//shop.html파일의 경로는 지금 파일의 루트 경로가 아니므로, ../를 추가해준다.

module.exports = router;
