const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  comment: {
    type: String,
  },

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

  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'list',
    },
  ],

  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board',
    },
  ],

  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ],

  dates: {
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date
    }
  }

})

module.exports = mongoose.model('Card', cardSchema);