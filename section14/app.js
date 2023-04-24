const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
//session을 MongoDBStore에 함수로 전달
//함수 호출결과는 MongoDBStore에 저장됨
//어느 db서버에 데이터를 저장해야 할지 연결 문자열 전달.
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://jennerCoding:oC38fzkDAMaqTZa1@cluster0.7lqdxbj.mongodb.net/shop";
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions", //저장될 컬렉션의 이름 정의
}); //어떤 데이터베이스 서버에 저장할지 파악

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const loginRoutes = require("./routes/login");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false, //모든 요청마다가 아닌 세션 변경시에만 저장
    saveUninitialized: false, //저장할 필요가 없는 요청의 경우 저장하지 않음
    store: store, //위에서 store를 설정한 것을 store옵션에 추가
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(loginRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "jenner",
          email: "codin@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
