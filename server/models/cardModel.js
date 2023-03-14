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
  // Members, Checklist, Labels, Dates ...
  addons: {
    type: Array
  }
})

module.exports = mongoose.model('Card', cardSchema);