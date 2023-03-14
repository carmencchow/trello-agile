const User = require("../models/userModel");
const mongoose = require("mongoose");

// REGISTER user
const register = async (req, res) => {
  console.log("registering user");
};

// LOGIN user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || password)
    return res
      .status(400)
      .send({ message: "Please fill in all required fields" });
  console.log("logging in user");
};

// LOGOUT user
const logout = async (req, res) => {
  console.log("logging out user");
};

module.exports = { register, login, logout };
