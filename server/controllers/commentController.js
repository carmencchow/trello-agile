const Card = require("../models/cardModel");
const User = require("../models/userModel");
const List = require("../models/listModel");
const Comment = require("../models/commentModel");

const createComment = async (req, res) => {
  const text = req.body.text;
  const cardId = req.query.cardId;
  try {
    const parentList = await Card.findById(cardId);
    const result = await Comment.create({ text, parentList: parentList._id, timestamps: true });
    console.log(result);

    await result.save();
    parentList.comments.push(result._id);
    await parentList.save();
    console.log("Comment created");
    return res.status(201).send({ message: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};
