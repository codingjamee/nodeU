const express = require("express");
// const bodyParser = require("body-parser")
const expressHbs = require("express-handlebars");

const app = express();

const users = [];

// app.engine("hbs", expressHbs({defaultLayout: 'main-layout', extname:'hbs'})) //엔진에 등록 //default layout 과 extname 설정 반드시 해야

// app.set("view engine", "pug");
// app.set("view engine", "hbs");//hbs를 뷰엔진으로 사용
app.set("view engine", "ejs"); //ejs를 뷰엔진으로 사용
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser({extended : true}))

app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Add User" });
});
app.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "User",
    users: users,
    hasUsers: users.length > 0,
  });
});
app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/users");
});

app.listen(3000);
