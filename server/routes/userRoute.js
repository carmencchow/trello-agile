const express = require("express");
const User = require("../models/userModel");
// const { register } = require("../controllers/userController");
// const { auth, requiresAuth } = require("express-openid-connect");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(
    "User endpoints, check routes/userRoute for endpoints. Unless you're using login functions, that's in server.js"
  );
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// ROUTES '/api/user'
// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

module.exports = router;
