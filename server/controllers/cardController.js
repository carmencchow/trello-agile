const Card = require("../models/cardModel");
const User = require("../models/userModel");
const List = require("../models/listModel");

// GET all cards (working)
const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    if (!cards) {
      return res.status(404).send({ message: "No cardss" });
    }
    return res.status(200).send({ message: "Returning all cards", cards });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// GET a card (working)
const getCard = async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id });
    if (!card) {
      return res.status(404).send({ message: "Card not found" });
    }
    return res.status(200).send({ message: "Returning card", card });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// GET filtered list of cards
const getFilteredCards = async (req, res) => {
  try {
    const remove = await Card.findOne({_id: req.params.id});
    console.log('archived card is', remove)
    const filteredCards = await Card.find({_id: { $nin: req.params.id}})
    // const filteredCards = await Card.find({_id: { $ne: req.params.id}})
    return res.status(200).send({ message: 'Returning filtered cards', filteredCards });
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}


// GET ONLY members from a card (working)
const getMembersFromCard = async (req, res) => {
  try {
    const users = await User.find({ cards: req.params.id });
    console.log(users);
    res.status(200).send({
      message: "The members",
      users: users.map((user) => {
        return { name: user.name, email: user.email };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Cannot find members" });
  }
};

// TODO: UPDATE members of a card
const deleteMembers = async (req, res) => {
  try {
    const users = await User.findOneAndDelete({ cards: req.params.id });
    console.log(users);
    res.status(200).send({
      users: users.map((user) => {
        return { name: user.name };
      }),
    });
  } catch (err) {
    return res.status(500).send("error");
  }
};

const updateMembers = async (req, res) => {};
const addMembers = async (req, res) => {};

// DELETE a card (working)
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
    const result = await Card.create({ title, parentList: parentList._id });
    console.log(result);

    await result.save();
    parentList.cards.push(result._id);
    await parentList.save();
    console.log("Card created");
    return res.status(201).send({ message: result });
  } catch (err) {
    // return res
    //   .status(500)
    //   .send({ message: "Card already exists. Try a different name." });
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// UPDATE card details (working)
const updateCardName = async (req, res) => {
  const title = req.body.title;
  const listId = req.query.listId;

  try {
    const parentList = await List.findById(listId);
    const card = await Card.findById({ _id: req.params.id, parentList: parentList._id });
    if (!card) {
      res.status(404).send("Card not found");
    }
    card.title = title;
    await card.save();
    parentList.cards.push(card._id);
    await parentList.save();
    // console.log(card._id, card.name);
    return res.status(200).send({ message: "Card name updated", card: card.title });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while trying to update the card" });
  }
};

module.exports = {
  getCard,
  getCards,
  getFilteredCards,
  deleteCard,
  createCard,
  updateCardName,
  getMembersFromCard,
  updateMembers,
  deleteMembers,
  addMembers,
};
