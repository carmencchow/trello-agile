const Card = require("../models/cardModel");
const User = require("../models/userModel");
const List = require("../models/listModel");
const Comment = require("../models/commentModel");

// CREATE a comment
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


// ADD COMMENT
const addComment = async (req, res) => {
  try{
    const newComment = req.body.comments;
    const card = await Card.findOne({ _id: req.params.id });
    card.comments.push(newComment)
    await card.save();
    console.log('Comments added: ', card.comments)
    return res.status(200).send({ results: card, message: card.comments });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// DELETE COMMENT
const deleteComment = async (req, res) => {
  try{
    const card = await Card.findById({ _id: req.params.id });
    res.send(200).send(card);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

//     const list = await List.findById(card.parentList);
//     list.cards = list.cards.filter(
//       (cardId) => cardId.toString() !== card._id.toString()
//     );
//     await list.save();
//     return res.send("Card deleted");
//   } catch (err) {
//     return res.status(500).send({ message: "Error deleting card" });
//   }
// };

// EDIT COMMENT
const editComment = async (req, res) => {}


module.exports = {
  addComment,
  deleteComment,
  editComment,
};