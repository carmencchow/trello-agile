const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5001;
const cors = require('cors');

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db and listening to port ${PORT}`);
    })
  })
  .catch((err) => {
    console.log(err)
  })