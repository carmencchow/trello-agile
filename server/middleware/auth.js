const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Missing Authorization Header");
    return res.status(401).json({ message: "Auth Error" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Invalid token");
    return res.status(401).json({ message: "Auth Error" });
  }
  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Invalid Token" });
  }
};
