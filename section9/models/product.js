const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  //mongodb에 연결하여 product저장하기
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //update the Product
      const filter = { _id: this._id };
      const updateDocument = {
        $set: this,
      };
      dbOp = db.collection("products").updateOne(filter, updateDocument);
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    // 데이터베이스와 상호작용이 r가능한 연결확보
    //db의 컬렉션에 연결하기
    //insertMany는 입력을 원하는 js객체의 배열을 받음 json이 아님
    //mongodb가 변환함
    return dbOp
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    //데이터 탐색 메서드find
    //cursor를 반환함
    //cursor는 모든 데이터를 가져오되,
    //순차적으로 가져올 수 있는 핸들 기능임
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        // console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        // console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
