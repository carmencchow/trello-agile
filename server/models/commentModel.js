const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    // board: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "board",
    // },
    parentList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "card",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
