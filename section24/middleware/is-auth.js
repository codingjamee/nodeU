const jwt = require("jsonwebtoken");
const secretKey = require("../dev").secretKey;

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secretKey);
  } catch {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const err = new Error("Not authenticated");
    err.statusCode = 401;
    throw err;
  }
  req.userId = decodedToken.userId;
  next();
};
