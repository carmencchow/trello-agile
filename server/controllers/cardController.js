const Card = require("../models/cardModel");
const User = require("../models/userModel");
const List = require("../models/listModel");

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

// GET a card
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

// GET unarchived list of cards
//http://localhost:5000/api/card/isArchived=true
const archiveCard = async (req, res) => {
  // onClick - findByIdAndUpdate change 'isArchived' field to 'true' in cardSchema
  try{
    let card = await Card.findById({ _id: req.params.id });
    const filter = { _id: req.params.id };
    const update = { isArchived: true };
    let doc = await Card.findOneAndUpdate(filter, update);
    doc = await Card.findOne(filter);
    console.log(doc.isArchived);
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}


const getArchived = async (req, res) => {
  
}

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
    const result = await Card.create({ title, parentList: parentList._id, isArchived: false });
    console.log(result);

    await result.save();
    parentList.cards.push(result._id);
    await parentList.save();
    console.log("Card created");
    return res.status(201).send({ message: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// UPDATE card details 
const updateCardName = async (req, res) => {
  try {
    const title = req.body.title;
    const card = await Card.findById({ _id: req.params.id });
     card.title = title;
    await card.save();
    console.log(card._id, card.name, title);
    return res.status(200).send({ message: "Card name updated", card: card.title });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while trying to update the card" });
  }
};

module.exports = {
  getCard,
  getCards,
  archiveCard,
  deleteCard,
  createCard,
  updateCardName,
  // getMembersFromCard,
  updateMembers,
  deleteMembers,
  addMembers,
};
