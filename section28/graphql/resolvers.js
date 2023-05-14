const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
  createUser: async function ({ userInput }, req) {
    // const email = userInput.email;
    // return User.findOne().then()
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
      throw error;
    }
    const hashedPw = bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toStirng() };
  },
};
