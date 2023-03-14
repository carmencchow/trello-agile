require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const boardRoute = require("./routes/boardRoute");
const listRoute = require("./routes/listRoute");
const cardRoute = require("./routes/cardRoute");
const userRoute = require("./routes/userRoute");
const PORT = process.env.PORT || 5001;
const cors = require("cors");

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.get("/test", (req, res) => {
//   res.send("Testing the server.");
// });

// Routes
app.use("/api/user", userRoute);
app.use("/api/board", boardRoute);
app.use("/api/list", listRoute);
app.use("/api/card", cardRoute);

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
