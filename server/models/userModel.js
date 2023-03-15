const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'list',
    },
  ],
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'card',
    },
  ],
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board',
    },
  ]
});

module.exports = mongoose.model('user', userSchema);