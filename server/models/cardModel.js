const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  
  name: {
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

  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ],

  owner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'list',
    },
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