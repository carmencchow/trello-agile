const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'card',
    }
  ],
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board',
    },
  ],
  
  // If we want to move the list to another board:
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board',
  },
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);