const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
      type: String,
    },
    parentList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card",
    }
  }, 
);

module.exports = mongoose.model("comment", commentSchema);

