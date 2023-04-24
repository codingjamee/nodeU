// const http = require("http");
const path = require("path");
const express = require("express");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");
//after npm install, need to import body-parser

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//정적 파일을 가져오려면?
app.use(express.static(path.join(__dirname, "public")));

//static에 경로를 구축하고 경로를 join한다.

app.use("/admin", adminRoutes); //순서를 주의 "/" path 이전에 사용
//공통된 이전의 path를 추가하기 위해서는
//outsourcing된 곳 말고 여기에 path 추가가능

app.use(shopRoutes);

//send 404 page

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "not-found.html"));
});

//if we wanna have always running code,
//set use method above all the other methods. and pass next method
// app.use("/", (req, res, next) => {
//   console.log("<h1>this always runs!</h1>");
//   next();
// });

//parsing incoming request
//$ npm install --save body-parser

//if wanna have some other path,
//need to add above "/" path
//and don't pass next method

// app.use("/add-product", (req, res, next) => {
//   res.send(
//     '<form action="/product" method="POST"><input type="text" name="title" ><button type="submit">Add Product</button></input></form>'
//   );
// });
// //input의 name속성은 요청을 보낼 때 함께 보낸다.

// //form action is path that is request url

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });
//this middleware always exectues
//.post method only executes at POST request

//we can place this middleware anywhere. prior or after middleware

// app.use("/", (req, res, next) => {
//   res.send("<h1>Hello</h1>");
// });
//doesn't have to input full path
//
// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next();
// });
//add a new middleware function
//it accepts array of request handlers
//using way 1. pass a function to it
//function will executed every incoming request
//the three arguments of function:
//req, res, next
// next is passed function to this function
//allow a request to travel next middleware

// app.use("/", (req, res, next) => {
//   console.log("In another middleware!");
//   res.send("<h1>Hello from Express!</h1>");
// });

// const server = http.createServer(app);

// server.listen(3000);
// above can be shorten by listen method

app.listen(3000);
