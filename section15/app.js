const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const MONGODB_URI = require("./dev").mongoURI;
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

//csrf초기화
const csrfProtection = csrf();

//configuration 설정
//diskStorage는 multer와 함께 사용하는 저장소 엔진.
//js객체를 전달하여 구성
//파일이름과 저장위치를 제어
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
  //destination은 함수. 설정이 완료된 뒤 호출하게 됨
  //cb는 첫번째가 null. 오류가 있을 경우 multer에게 알림
  //두번째는 우리가 설정하려는 파일 이름
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  //파일을 저장하고 싶은 경우 두번째 파라미터로 true, 아니면 false
  //파일 타입을 확인하여 저장 혹은 거절
};
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
//dest 속성 multer로 images 네임의 파일 전소압ㄷ기
//storage
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//csrfProtect
//반드시 세션 초기화 이후
//세션을 사용하므로.
//get이외의 데이터 변경하는 요청에 대해
//뷰에 csrf토큰이 있는지 확인
app.use(csrfProtection);

//connect-flash
//세션 초기화 이후 해야함
//request object에 사용가능
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

//모든 요청에 대해 렌더링 뷰에서 아래의 두 필드가 설정됨
app.use((req, res, next) => {
  //local variable을 설정
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use("/500", errorController.get500);
app.use(errorController.get404);

app.use((err, req, res, next) => {
  res.redirect("/500");
});
//오류가 전달된 next를 호출하는 경우 4개 인수를 받은
//현재 오류처리 미들웨어로 곧바로 이동

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
