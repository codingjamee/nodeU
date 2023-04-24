//mongodb

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  //클라이언트를 이용해 mongodb 데이터베이스에 연결
  MongoClient.connect(
    "mongodb+srv://jennerCoding:oC38fzkDAMaqTZa1@cluster0.7lqdxbj.mongodb.net/products?retryWrites=true"
  )
    .then((client) => {
      console.log("connected!");

      //default값으로 test데이터베이스에 연결됨
      //url에 명시했기 때문 shop에 연결되려면 shop으로 변경
      //이전 url"mongodb+srv://jenner:hxlNPKkcYjXCqS0i@cluster0.j2p6zer.mongodb.net/test"
      _db = client.db();

      //테이블 생성할 필요 없음. 접근하면 즉석에서 생성됨

      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

//연결된 데이터베이스로의 접근이 존재하는 경우 접근을 반환
//없으면 에러 //mongodb 의 connect풀링을 위한 장치??
//연결되어있는 데이터베이스 인스턴스 반환
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

//app.js와 연결하기 위해

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
