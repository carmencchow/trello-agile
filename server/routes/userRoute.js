const express = require("express");
const { login, logout, register } = require("../controllers/userController");

const router = express.Router();
// Load Users Data. Only hit once or duplicates will ensue. Duplicates...
router.get("/get-users", (req, res) => {
  res.send("Users will load here.");
});
// ROUTES '/api/user'
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
