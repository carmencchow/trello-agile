const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  auth0Id: { type: String },

  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
