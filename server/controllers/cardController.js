const Card = require('../models/cardModel');
const mongoose = require('mongoose');


// GET cards
const getCards = async (req, res) => {
  console.log('getting cards')
  try {
    const cards = await Card.find({}).sort({ name: 1})
    res.status(200).json(cards)
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }


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


module.exports = { getCard, getCards, deleteCard, createCard, updateCardName, updateMembers }