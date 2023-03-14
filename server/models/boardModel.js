const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  category: {
    type: String,
    unique: true,
    required: true
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);