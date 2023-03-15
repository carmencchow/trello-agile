const Card = require('../models/cardModel');
const List = require('../models/listModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');


// GET cards
const getCards = async (req, res) => { 
try {
    const card = await Card.find()
    if(!card){
      return res.status(404).send({ message: 'Board not found' });
    }
    return res.status(200).send({ message: 'Returning board', card });
  } catch (err){
    return res.status(500).send(err);
  }
}

// GET all members associated with a CARD:
const getMembersFromCard = async (req, res) => {
  try {
    const users = await User.find({ cards: req.params.id })
    console.log(users)
    // const member = await Card
    //   .findOne({_id: req.params.id})
    //   .populate('members')
    //   .exec() 
      res.status(200).send({ message: 'The members', users: users.map((
        user => { 
          return  { name: user.name, email: user.email } 
        })) 
      });

  } catch (err){
    console.log(err)
    res.status(500).send({ message: 'Cannot retrieve members'})
  }  
};


// GET card by id
const getCard = async (req, res) => {
  console.log('getting card')
}

// DELETE card
const deleteCard = async (req, res) => {
  console.log('creating board')
}

// CREATE a card
const createCard = async (req, res) => {
  console.log('creating card')
}

// UPDATE name
const updateCardName = async (req, res) => {
  console.log('updating card name')
}

// ADD, REMOVE members to card
const updateMembers = async (req, res) => {
  console.log('updating members')
}


module.exports = { getCard, getCards, deleteCard, createCard, updateCardName, updateMembers, getMembersFromCard }