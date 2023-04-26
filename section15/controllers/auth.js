const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const sendGridApikey = require("../dev").sendGridApikey;

const User = require("../models/user");

//transporter초기화
//auth객체 안에 apikey 추가하여 설정
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendGridApikey,
    },
  })
);
//createTransport메서드 호출, sendgridTransport를 입력해 함수로 실행

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    //post login부분에서 명시한 key
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          //일치와 불일치 모두 여기에 도달함
          if (doMatch) {
            //match할 때만(불리언값) 세션 설정
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  //이메일 존재하는지 확인
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email exists already");
        return res.redirect("/signup");
      }
      //bcrypt의 hash메서드 :
      //1번째 인수 해시화 하고 싶은 문자열,
      //2번째 인수 salt 몇차례 해싱을 적용할 것인지
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          //회원가입시 메일발송
          res.redirect("/login");
          return transporter.sendMail({
            to: email,
            from: "hurjane@naver.com",
            subject: "Sign up succeeded!",
            html: "<h1>You Successfully signed up!</h1>",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};
