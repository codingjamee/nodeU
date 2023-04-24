const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //createProduct메서드는 관계설정에 따라 sequelize가
  //새로운 관련 객체를 만들기 위해 생성해줌
  //모델 명이 Product이므로 createProduct로 만들어줌
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  //현재 접속중인 유저의 제품만 찾기
  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      //한라ㅏ도 배열로 돌려받음
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  //제품 수정할 때 sequelize 사용해보기
  //제품 추가할 때 관련된 사용자에 대한 추가 정보를 전달해보기
  Product.findByPk(prodId)
    .then((product) => {
      //이건 직접 데이터베이스를 변경하는 로직은 아님
      //js앱에서 로컬로 일시적으로 이루어짐
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      product.price = updatedPrice;

      //sequelize가 제공하는 메서드
      //편집할 때마다 실행하므로 그때마다 db에 저장하게 해줌
      //이것이 디비를 변경
      //product가 존재하지 않으면 새로 생성.
      //있다면 덮어쓰거나 업데이트
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDescription,
  //   updatedPrice
  // );
  // updatedProduct.save();
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.deleteEditProduct = (req, res, next) => {
  const prodId = req.body.deleteProdId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // Product.destory(prodId);
  //Product.destroy 혹은 findById이후 그안에서 destroy메서드 실행
};
