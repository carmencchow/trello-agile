const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "card",
      },
    ],

    // If we want to move the list to another board:
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("list", listSchema);
