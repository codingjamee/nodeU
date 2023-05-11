const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../dev").secretKey;

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User created! ",
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("user was not found");
        err.statusCode = 401;
        throw err;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("wrong password!");
        error.statusCode = 401;
        throw error;
      }
      //userEmail과 password가 일치하는 경우
      //jwt token 생성하기
      const token = jwt.sign(
        {
          //패스워드는 절대 불포함! 첫번째 인자 아무거나 가능!
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          //두번째 인자는 서버에만 있는 비공개키 최대한 길게!
        },
        secretKey,
        //세번째 인자는 exire time
        { expiresIn: "1h" }
      ); //새로운 서명을 만들고 jwt토큰에 포함
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
