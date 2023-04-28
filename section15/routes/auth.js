const express = require("express");
const { check, validationResult } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email ")
    .custom((value, { req }) => {
      if (value === "test@test.com") {
        throw new Error("this email is not valid");
      }
    }), //error메시지 커스터마이징
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

//다이내믹한 token파라미터 반드시 컨트롤러에서 해당 변수로 찾아야함

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
