const Product = require("../models/product.js");

exports.getAddproduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      // layout: false,
    });
  });
};

exports.get404page = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "views", "404.html"));
  res.render("404", { path: "Error", pageTitle: "notFound" });
};
