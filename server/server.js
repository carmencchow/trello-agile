require("dotenv").config();
const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const mongoose = require("mongoose");
const boardRoute = require("./routes/boardRoute");
const listRoute = require("./routes/listRoute");
const cardRoute = require("./routes/cardRoute");
const userRoute = require("./routes/userRoute");
const PORT = process.env.PORT || 5001;
const cors = require("cors");
const User = require("./models/userModel");

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.CLIENT_ID,
//   issuerBaseURL: process.env.ISSUER_BASE_URL,
// };

// app.use(auth(config));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.get("/test", (req, res) => {
//   res.send("Testing the server.");
// });

// Routes
app.use("/api/board", boardRoute);
app.use("/api/list", listRoute);
app.use("/api/card", cardRoute);
app.use("/api/user", userRoute);

// const checkUser = async (req, res) => {
//   if (req.oidc.user) {
//     const { sub } = req.oidc.user;
//     const user = await User.findOne({ auth0Id: sub });
//     if (user) {
//       req.user = user;
//     } else {
//       const { name, email } = req.oidc.user;
//       const newUser = new User({
//         auth0Id: sub,
//         userName: name,
//         email: email,
//         boards: [],
//       });
//       await newUser.save();
//       req.user = newUser;
//     }
//   } else {
//     res.redirect("/login");
//     // will want to redirect to login if no profile found.
//   }
// };

app.get("/profile", async (req, res) => {
  res.send("Welcome to profile");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db and listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
