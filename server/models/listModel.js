const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  tasks: {
    type: Array,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);