const Card = require('../models/cardModel');
const mongoose = require('mongoose');

const createCard = async (req, res) => {
  console.log('creating card')
}

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


// GET card
const getCard = async (req, res) => {
  console.log('getting card')
}

// DELETE card
const deleteCard = async (req, res) => {
  console.log('creating board')
}

// POST card
// UPDATE card

module.exports = { getCard, getCards, deleteCard, createCard }