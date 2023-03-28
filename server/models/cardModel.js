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

  // Optional: labels, members, dates ...
  labels: [
    {
      text: {
        type: String,
      },
      color: {
        type: String,
      },
      background: {
        type: String,
      },
      selected: {
        type: Boolean,
      },
    },
  ],

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
