const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const archiveSchema = new Schema(
  {
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "card",
      },
    ],
  }
);

module.exports = mongoose.model("archive", archiveSchema);
