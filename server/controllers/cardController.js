const Card = require("../models/cardModel");
const List = require("../models/listModel");
const Comment = require("../models/commentModel");

// GET all cards
const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    if (!cards) {
      return res.status(404).send({ message: "No cards" });
    }
    return res.status(200).send({ message: "Returning all cards", cards });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// GET card by ID
const getCard = async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id })
      .sort({
        comments: -1,
      })
      .populate("comments");
    if (!card) {
      return res.status(404).send({ message: "Card not found" });
    }
    return res.status(200).send({ message: "Returning card", card });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// UPDATE archive status
const archiveCard = async (req, res) => {
  try {
    let card = await Card.findById({ _id: req.params.id });
    const filter = { _id: req.params.id };
    const update = { isArchived: true, status: "archived" };
    let doc = await Card.findOneAndUpdate(filter, update);
    doc = await Card.findOne(filter);
    await doc.save();
    console.log("isArchived:", doc.isArchived);
    return res.status(200).send({ card: doc });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// DELETE a card
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete({ _id: req.params.id });

    if (!card) {
      return res.status(404).send("Card not found");
    }
    const list = await List.findById(card.parentList);

    list.cards = list.cards.filter(
      (cardId) => cardId.toString() !== card._id.toString()
    );
    await list.save();
    return res.send("Card deleted");
  } catch (err) {
    return res.status(500).send({ message: "Error deleting card" });
  }
};

// CREATE a card
const createCard = async (req, res) => {
  const title = req.body.title;
  const listId = req.query.listId;
  try {
    const parentList = await List.findById(listId);
    const result = await Card.create({
      title,
      parentList: parentList._id,
      isArchived: false,
      comments: [],
      timestamps: true,
    });
    console.log("ParentList is: ", parentList, result);
    await result.save();
    parentList.cards.push(result._id);
    await parentList.save();
    console.log("Card created");
    return res.status(201).send({ message: result, title });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// UPDATE card name
const updateCardName = async (req, res) => {
  try {
    const title = req.body.title;
    const id = req.query.id;
    const card = await Card.findById({ _id: req.params.id });
    card.title = title;
    await card.save();
    console.log(card._id, card.name, title);
    return res
      .status(200)
      .send({ message: "Card name updated", card: card.title });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Error occurred while trying to update the card" });
  }
};

// UPDATE COLOR
const updateColor = async (req, res) => {
  try {
    const color = req.body.color;
    const id = req.query.id;
    const card = await Card.findById({ _id: req.params.id });
    card.color = color;
    await card.save();
    console.log(card.color);
    return res.status(200).send({ message: "Card color updated", card });
  } catch (err) {
    console.log(err);
  }
};

// ADD a COMMENT
const createComment = async (req, res) => {
  const content = req.body.comment;
  const cardId = req.params.id;
  console.log("Request is:", req.body.comment, req.params.id);
  try {
    const parentCard = await Card.findById(cardId);
    const newComment = await Comment.create({
      content,
      owner: cardId,
    });
    console.log("parentCard is: ", cardId, newComment);
    await newComment.save();
    parentCard.comments.push(newComment._id);
    await parentCard.save();
    console.log("Comment saved");
    return res.status(200).send({ message: newComment });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getCard,
  getCards,
  createComment,
  archiveCard,
  deleteCard,
  createCard,
  updateCardName,
  updateColor,
};
