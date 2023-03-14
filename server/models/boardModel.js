const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  visibility: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);



const boardData = [
  {
    "title": "Project",
  },
  {
    "title": "Meetings",
  },
  {
    "title": "Assignments",
  }
]