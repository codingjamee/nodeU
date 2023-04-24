// // const fs = require("fs");
// // const path = require("path");

// const db = require("../util/database");

// const Cart = require("./cart");

// // const p = path.join(
// //   path.dirname(require.main.filename),
// //   "data",
// //   "products.json"
// // );

// // const getProductsFromFile = (cb) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, image, description) VALUES(?, ?, ?, ?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//     // getProductsFromFile((products) => {
//     //   if (this.id) {
//     //     const existingProductIndex = products.findIndex(
//     //       (prod) => prod.id === this.id
//     //     );
//     //     const updatedProducts = [...products];
//     //     updatedProducts[existingProductIndex] = this;
//     //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//     //       console.log(err);
//     //     });
//     //   } else {
//     //     this.id = Math.random().toString();
//     //     products.push(this);
//     //     fs.writeFile(p, JSON.stringify(products), (err) => {
//     //       console.log(err);
//     //     });
//     //   }
//     // });
//   }

//   static fetchAll(cb) {
//     return db.execute("SELECT * FROM products");

//     // getProductsFromFile(cb);
//   }

//   static findById(id, cb) {
//     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
//     // getProductsFromFile((products) => {
//     //   const product = products.find((prod) => prod.id === id);
//     //   cb(product);
//     // });
//   }

//   static deleteProduct(id) {
//     // getProductsFromFile((products) => {
//     //   const product = products.find((p) => p.id === id);
//     //   const updatedProducts = products.filter((p) => p.id !== id);
//     //   fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//     //     console.log(err);
//     //     if (!err) {
//     //       //장바구니에서도 제거하기
//     //       Cart.deleteCartProduct(id, product.price);
//     //       console.log("deleteCart****");
//     //     }
//     //   });
//     // });
//   }
// };

const Sequelize = require("sequelize");
//npm install 한 sequelize 설치하기

const sequelize = require("../util/database");
//data베이스에서 내보낸 두가지 불러오기

const Product = sequelize.define("product", {
  //sql에서 첫줄(?) 만들기
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;

//sequelize.define
//첫번째 인수 : 모델이름
//두번째 인수 : js object 데이터베이스 테이블 정의
//(제품들이 가지는 속성이나 필드 정의)
//id:{ type:}
