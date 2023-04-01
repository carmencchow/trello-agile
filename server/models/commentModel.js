const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      // type: mongoose.Schema.Types.ObjectId,
      type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    card: {
      type: Schema.Types.ObjectId,
      // type: mongoose.Schema.Types.ObjectId,
      ref: "card",
      required: true,
    },
  },
  {
    update_on: {
      type: Date,
      default: Date.now(),
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);

