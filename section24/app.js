const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed");
const MONGODB_URI = require("./dev").mongoURI;
const mongoose = require("mongoose");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); //application/json

// /images로 향하는 요청을 정적으로 제공하게 될 폴더
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 모든 클라이언트의 엑세스 허용 //특정 도메인만 허용도 가능

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  ); //특정 메서드 허용
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //클라이언트가 요청에 설정할 수 있는 헤더 정해주기

  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
