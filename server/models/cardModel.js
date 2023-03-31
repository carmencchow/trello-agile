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
    timestamps: true, 
    required: true,
  },
  // testComments: {
  //   _id: {
  //     type: Object,
  //     text: String,
  //     id: Number
  //   }
  // },
  testComments: [
    {
      commendId: {
        type: Number
      },
      text: { 
        type: String 
      }
    },
  ],
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
