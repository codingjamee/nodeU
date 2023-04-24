const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("login/loginForm", {
    pageTitle: "login",
    path: "/login",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("643f35d7e070031fd4f13afb").then((user) => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      console.log(err);
      res.redirect("/");
    });
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
