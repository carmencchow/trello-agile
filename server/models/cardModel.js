const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  comments: {
    type: Array,
  },
  isArchived: {
    type: Boolean,
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
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],

  dates: {
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
  },
});

module.exports = mongoose.model("card", cardSchema);
