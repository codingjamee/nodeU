// const fs = require("fs");
// const path = require("path");

// const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     //fetch the previous cart
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err && fileContent) {
//         //cart에 데이터가 있으면
//         cart = JSON.parse(fileContent);
//       }
//       //Analyze the cart => Find existing product
//       const existingProductIndex = cart.products.findIndex(
//         (prod) => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       //Add new product / increase quantity
//       if (existingProduct) {
//         //cart에 해당 product가 있다면
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         // cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         //cart에 해당 product가 없다면
//         //새로운 object를 생성
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteCartProduct(id, price) {
//     //file을 읽어와서
//     //해당 id의 프로덕트를 찾고
//     //그걸 없앤뒤
//     //
//     //다시 카트 파일을 작성
//     fs.readFile(p, (err, fileContent) => {
//       if (err) return;

//       if (fileContent) {
//         const updatedCart = { ...JSON.parse(fileContent) };
//         console.log(updatedCart);
//         const deleteProduct = updatedCart.products.find((p) => p.id === id);
//         if (!deleteProduct) {
//           return;
//         }
//         const deleteProductQty = deleteProduct.qty;
//         //그만큼 제품 가격도 지운다.
//         // const productQty = existingProduct.qty;
//         updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
//         updatedCart.totalPrice =
//           updatedCart.totalPrice - +deleteProductQty * price;
//         fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         cb(null);
//       } else {
//         cb(JSON.parse(fileContent));
//       }
//     });
//   }
// };

//여러 사용자들의 카트 테이블
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
