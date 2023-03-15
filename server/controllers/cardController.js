const Card = require('../models/cardModel');
const List = require('../models/listModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');


// GET all cards (working)
const getCards = async (req, res) => { 
  try {
    const cards = await Card.find()
    if(!cards){
      return res.status(404).send({ message: 'No cardss' });
    }
    return res.status(200).send({ message: 'Returning all cards', cards });
    } catch (err){
      return res.status(500).send(err);
    }
  }

// GET a card (working)
const getCard = async (req, res) => { 
  try {
    const card = await Card.findOne({_id: req.params.id});
    if(!card){
      return res.status(404).send({ message: 'Card not found' });
    }
    return res.status(200).send({ message: 'Returning card', card });
  } catch (err){
    return res.status(500).send(err);
  }
}

// GET ONLY members from a card (working)
const getMembersFromCard = async (req, res) => {
  try {
    const users = await User.find({ cards: req.params.id })
    console.log(users)
    res.status(200).send({ message: 'The members', users: users.map((
      user => { 
        return  { name: user.name, email: user.email } 
      })) 
    });
  } catch (err){
    console.log(err)
    res.status(500).send({ message: 'Cannot find members'})
  }  
};

// TODO: UPDATE members of a card
const deleteMembers = async (req, res) => {
  try {
    const users = await User.findOneAndDelete({ cards: req.params.id })
    console.log(users)
    res.status(200).send({ users: users.map((
      user => {
        return { name: user.name }
      }
    ))})
  } catch (err) {
    return res.status(500).send( 'error')
  }
};


const updateMembers = async (req, res) => {};
const addMembers = async (req, res) => {};

// DELETE a card (working)
const deleteCard = async (req, res) => {
  try {
    const cardId = await Card.findOneAndDelete({_id: req.params.id });
    if(!cardId){
      return res.status(404).send('Card not found');
    }
    return res.send('Card deleted');
  } catch (err) {
    return res.status(500).send({ message: 'Error deleting card'});
  }
}

// TODO: CREATE a card, VALIDATE FIRST! 
const createCard = async (req, res) => {
  const name = req.body.name;
// make sure card doesn't already exist
  // const isCard = await Card.find().select({ name: name, _id: 0 })
  // if (!isCard)
    try {
      const result = await Card.create({ name });
      console.log('Card created')
      return res.status(201).send({ message: result });
    } catch (err) {
      return res.status(500).send({ message: 'Card already exists. Try a different name.'});
    }
  };

// UPDATE a card's name (working)
const updateCardName = async (req, res) => {
  const { id, name } = req.body
  try {
    const card = await Card.findOneAndUpdate({ id: id }, { name }, { new: true })
    console.log(card._id, card.name)
    res.status(200).send({ message: 'Card name updated', card })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Error occurred while trying to update the card'})
  }
}

module.exports = { getCard, getCards, deleteCard, createCard, updateCardName, getMembersFromCard, updateMembers,deleteMembers, addMembers }