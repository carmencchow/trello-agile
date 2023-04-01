const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    timestamps: true, 
    required: true,
  },
  // comments: [
  //   {
  //     text: String,
  //     postedBy: {
  //       type: ObjectId,
  //       ref: "user",
  //       timestamps: true,
  //     },
  //   },
  // ],
  isArchived: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  parentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "list",
    },
  ],
  color: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("card", cardSchema);
