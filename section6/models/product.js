const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(p, (error, fileContent) => {
    if (error) {
      return callback([]);
    } else {
      fileContent && callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
    // fs.readFile(p, (error, filecontent) => {});
    //file 을 읽어오기 fs.readFile
    //file 작성하기 fs.writeFile
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
    //readFile은 asynchronous코드.
    //그래서 실행이 완료가 되면 그다음에 실행할 수 있는 익명함수를
    //전달해 주어 순차적으로 일어날 수 있게 한다.
  } // new키워드로 만든 인스턴스가 아니더라도  Product.fetchAll메서드로 접근가능
};
//product만드는 클래스함수
//객체에 저장할 수있는 메서드,
//인스턴스가 아닌 곳에서도 모든 products를 가져올 수있는 메서드가 있음
