const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    title: {
      type: String,
    },

    visibility: {
      type: String,
    },

    // Users associated with this board
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

    // Lists associated with this board
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "list",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("board", boardSchema);
