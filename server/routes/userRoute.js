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

router.post("/userInDB", async (req, res) => {
  const { sub, name, email } = req.body;
  const userExists = await User.findOne({ sub });

  if (userExists) {
    return res.status(409).json({ error: "User already exists" });
  } else {
    const newUser = new User({
      auth0Id: sub,
      userName: name,
      email: email,
      boards: [],
    });

    try {
      await newUser.save();
      return res.status(201).json({ success: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.get("/verifyUser/:sub", async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.params.sub });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

// ROUTES '/api/user'
// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

module.exports = router;
