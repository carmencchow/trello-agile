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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board',
  },
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);