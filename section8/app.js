const path = require("path");
const express = require("express");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

//뷰엔진 설정하기
app.set("view engine", "ejs");
//views의 경로 정의해주기
app.set("views", "views");

//이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공
app.use(express.static(path.join(__dirname, "public")));

//url을통해 input으로 보내진 데이터를 파싱
app.use(bodyParser.urlencoded({ extended: false }));

//반드시 먼저 쓸 것 /admin경로일때
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.render("404", { path: "Error", pageTitle: "not Found" });
});

app.listen(3000);
