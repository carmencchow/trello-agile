const express = require("express");
const User = require("../models/userModel");
const { login, logout, register } = require("../controllers/userController");

const router = express.Router();
// Load Users Data. Only hit once or duplicates will ensue. Duplicates...
router.get("/get-users", (req, res) => {
  try {
    let user = new User({
      name: "JohnnyAppleseed",
      email: "JohnnyApple@gmail.com",
      password: "pa$$w0rd",
      boards: [],
    });
    user.save();
    res.send("User loaded to database.");
  } catch (err) {
    console.log(err);
    res.send("Error generating Data");
  }
});
// ROUTES '/api/user'
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
