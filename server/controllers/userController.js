// const mongoose = require("mongoose");
// const User = require("../models/userModel");

// REGISTER user
// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res
//       .status(400)
//       .send({ message: "Please fill in all required fields" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();
//     res.status(201).send({ message: "User created successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: "Server error" });
//   }
// };

// LOGIN user
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || password)
//     return res
//       .status(400)
//       .send({ message: "Please fill in all required fields" });
//   console.log("logging in user");
//   // try {
//   //   const user = await User.findOne({ email });
//   //   if (!user) {
//   //     res.status(401).send({ message: "Invalid email or password" });
//   //   }
//   // } catch (err) {
//   //   console.log(err);
//   //   res.status(500).send({ message: "Server error" });
//   // }
// };

// LOGOUT user
// const logout = async (req, res) => {
//   console.log("logging out user");
// };

// module.exports = { };
