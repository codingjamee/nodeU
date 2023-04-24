const path = require("path");
const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const productsController = require("./controllers/products");
// const expressHbs = require("express-handlebars");

const app = express();

//뷰엔진  ejs로 설정하기
app.set("view engine", "ejs");
app.set("views", "views");
//뷰엔진 express handlebar로 설정하기
// app.engine(
//   "handlebars",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "handlebars",
//   })
// );
//layoutsDir: 레이아웃 폴더가 어디있는지 알리는 용도

//빌트인이 아닌 엔진을 사용할때 활용하는 메서드. //pug는 빌트인, express-handlebar는 아님.
//인수 1.빌트인엔진과 충돌하지 않도록 고유의 이름을 정함.
//인수 2. expressHbs메서드를 이니셜라이징 함.
//인수 2 는 엔진에 할당할수 있는 이니셜라이즈된 뷰 엔진을 return함.

// app.set("view engine", "handle bars"); //위에 엔진메서드에 셋업한 이름과 두번째 인수가 같아야함
//뷰엔진을 handlebars로 설정

//뷰엔진 퍼그로 설정하기
// app.set("view engine", "pug"); //뷰엔진을 pug로 설정해준다.
// app.set("views", "views"); // let express know where to find our views, but default setting is in view engine

app.use(express.static(path.join(__dirname, "public")));
//이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공

app.use(bodyParser.urlencoded({ extended: false }));

// /admin 경로일때
app.use("/admin", adminRoutes);

// /경로일때
app.use(shopRoutes);

//404 페이지
app.use(productsController.get404page);

//파일 http
app.listen(3001);
