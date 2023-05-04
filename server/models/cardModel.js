const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
  },
  // comments: {
  //   type: Array,
  // },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  isArchived: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  parentList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "list",
  },
  color: {
    type: String,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = mongoose.model("card", cardSchema);
