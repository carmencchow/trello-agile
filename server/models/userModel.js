const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  organization: {
    type: String, 
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "list",
    },
  ],
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card",
    },
  ],
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
