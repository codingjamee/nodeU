const express = require("express");

const router = express.Router();

const loginController = require("../controllers/login");

router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);
router.post("/logout", loginController.postLogout);

module.exports = router;
